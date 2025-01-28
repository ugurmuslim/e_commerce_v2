import { Inject, Injectable } from '@nestjs/common';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { fetchTrendyol, generateBasicAuth } from '../utils/fetch';
import { ECOMMERCE_SERVICE, SYNC_PRODUCTS_WITH_TRENDYOL } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateTrendyolProductDto } from '../dto/create-trendyol-product.dto';
import { BatchRequestResponse } from '../interfaces/batch-request-response.interface';
import { HistoryRepository } from '../repositories/history.repository';
import { GetRemoteProductFilterDto } from '../dto/get-remote-product-filter.dto';
import { dtoToQueryString } from '@app/common/utils/utils';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AbstractProductsService } from '@app/common/shared-db/services/abstract-products.service';

@Injectable()
export class ProductsService extends AbstractProductsService<ProductsRepository> {
  constructor(
    @Inject(ECOMMERCE_SERVICE) private readonly ecommerceClient: ClientProxy,
    protected readonly productsRepository: ProductsRepository,
    private readonly historyRepository: HistoryRepository,
  ) {
    super();
  }

  async getRemote(
    ecommerceBrand: BrandSettingsDocument,
    filter: GetRemoteProductFilterDto,
  ) {
    const filterString = dtoToQueryString(filter);
    try {
      let products = await fetchTrendyol({
        url: `suppliers/${ecommerceBrand.supplierId}/products?${filterString}`,
        auth: generateBasicAuth(
          ecommerceBrand.apiKey,
          ecommerceBrand.secretKey,
        ),
      });
      let lastPage = false;
      if (filter?.sync) {
        while (!lastPage) {
          for (const product of products.content) {
            await this.productsRepository.upsert(
              { barcode: product.barcode },
              { ...product, ecommerceBrandId: ecommerceBrand.ecommerceBrandId },
            );
          }

          if (products.page + 1 === products.totalPages) {
            lastPage = true;
          }

          products = await fetchTrendyol({
            url: `suppliers/${ecommerceBrand.supplierId}/products?${filterString}&page=${products.page + 1}`,
            auth: generateBasicAuth(
              ecommerceBrand.apiKey,
              ecommerceBrand.secretKey,
            ),
          });
        }
      }
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async createProducts(
    ecommerceBrand: BrandSettingsDocument,
    products: CreateTrendyolProductDto[],
  ) {
    try {
      for (const product of products) {
        await this.productsRepository.create({
          ...product,
          ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
        });
      }

      await this.createRemote(ecommerceBrand, products);
    } catch (error) {
      console.error(error);
    }
  }

  async updateStatusOfProducts(
    ecommerceBrand: BrandSettingsDocument,
    batchRequestId: string,
  ) {
    const response = await this.getProductsStatus(
      ecommerceBrand,
      batchRequestId,
    );

    for (const item of response.items) {
      const barcode = item.requestItem.product.barcode;
      const product = await this.productsRepository.findOne({ barcode });

      if (!product) {
        continue;
      }

      product.status = {
        synced: item.status,
        message: item.status == 'FAILED' ? item.failureReasons : null,
      };
      const { _id, ...productWithoutId } = product;
      await this.productsRepository.findOneAndUpdate(
        { barcode },
        productWithoutId,
      );
    }
    await this.historyRepository.findOneAndUpdate(
      { batchId: batchRequestId },
      { status: 'COMPLETED' },
    );
  }

  async getProductsStatus(
    ecommerceBrand: BrandSettingsDocument,
    batchRequestId: string,
  ) {
    try {
      return await fetchTrendyol({
        url: `suppliers/${ecommerceBrand.supplierId}/products/batch-requests/${batchRequestId}`,
        auth: generateBasicAuth(
          ecommerceBrand.apiKey,
          ecommerceBrand.secretKey,
        ),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProductQuantity(
    barcode: string,
    quantity: number,
    ecommerceBrandId: string,
  ) {
    const product = await this.productsRepository.findOne({
      barcode: barcode,
      ecommerceBrandId,
    });

    if (product) {
      product.quantity = product.quantity - quantity;
      await this.productsRepository.findOneAndUpdate(
        {
          barcode: barcode,
          ecommerceBrandId: ecommerceBrandId,
        },
        product,
      );
    }
  }

  async createRemote(
    ecommerceBrand: BrandSettingsDocument,
    products: CreateTrendyolProductDto[],
  ) {
    const response: BatchRequestResponse = await fetchTrendyol({
      url: `suppliers/${ecommerceBrand.supplierId}/v2/products`,
      auth: generateBasicAuth(ecommerceBrand.apiKey, ecommerceBrand.secretKey),
      method: 'POST',
      body: { items: products },
    });

    await this.historyRepository.create({
      ecommerceBrandId: products[0].ecommerceBrandId,
      batchId: response.batchRequestId,
      status: 'PENDING',
    });

    await this.updateStatusOfProducts(ecommerceBrand, response.batchRequestId);
  }

  async updateProduct(
    ecommerceBrand: BrandSettingsDocument,
    products: UpdateProductDto[],
  ) {
    for (const product of products) {
      this.productsRepository.findOneAndUpdate(
        {
          barcode: product.barcode,
          ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
        },
        product,
      );
    }

    this.updateRemote(ecommerceBrand, products);
  }

  async updateRemote(
    ecommerceBrand: BrandSettingsDocument,
    products: UpdateProductDto[],
  ) {
    const response: BatchRequestResponse = await fetchTrendyol({
      url: `suppliers/${ecommerceBrand.supplierId}/v2/products`,
      auth: generateBasicAuth(ecommerceBrand.apiKey, ecommerceBrand.secretKey),
      method: 'PUT',
      body: { items: products },
    });

    await this.historyRepository.create({
      ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
      batchId: response.batchRequestId,
      status: 'PENDING',
    });

    await this.updateStatusOfProducts(ecommerceBrand, response.batchRequestId);
  }

  async sendToPlatforms(
    currentEcommerceBrand: BrandSettingsDocument,
    barcodes: string[],
  ) {
    const products = await this.productsRepository.filter(
      {
        barcode: { $in: barcodes },
        ecommerceBrandId: currentEcommerceBrand.ecommerceBrandId,
      },
      1000,
    );

    if (products.data.length > 0) {
      const productsData = products.data.map(
        ({
          barcode,
          attributes,
          brandId,
          brand,
          title,
          description,
          listPrice,
          salePrice,
          quantity,
          images,
          pimCategoryId,
          categoryName,
          productMainId,
        }) => ({
          barcode,
          attributes,
          brandId,
          brand,
          title,
          description,
          listPrice,
          salePrice,
          currencyType: 'TRY', // Added fixed value
          quantity,
          images,
          categoryId: pimCategoryId,
          categoryName,
          productMainId,
        }),
      );
      this.ecommerceClient.emit(SYNC_PRODUCTS_WITH_TRENDYOL, {
        ecommerceBrandId: currentEcommerceBrand.ecommerceBrandId,
        products: { data: productsData },
      });
    }
  }
}
