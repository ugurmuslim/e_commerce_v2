import { Inject, Injectable } from '@nestjs/common';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { fetchN11 } from '../utils/fetch';
import { CreateN11ProductDto } from '../dto/create-n11-product.dto';
import { ECOMMERCE_SERVICE, SYNC_PRODUCTS_WITH_TRENDYOL } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductsRepository } from '../repositories/products.repository';
import { HistoryRepository } from '../repositories/history.repository';
import { GetRemoteProductsFilterDto } from '../dto/get-remote-product-filter';
import { dtoToQueryString } from '@app/common/utils/utils';
import { UpdateProductStockPriceDto } from '../dto/update-stock-price-filter';
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
    filter?: GetRemoteProductsFilterDto,
  ) {
    const filterString = dtoToQueryString(filter);

    let lastPage: boolean = false;

    let products = await fetchN11({
      url: `ms/product-query?${filterString}`,
      auth: ecommerceBrand.apiKey,
      secretyKey: ecommerceBrand.secretKey,
    });
    if (filter?.sync) {
      while (!lastPage) {
        for (const product of products.content) {
          await this.productsRepository.upsert(
            { id: product.n11ProductId },
            {
              ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
              id: product.n11ProductId,
              title: product.title,
              stockCode: product.stockCode,
              description: product.description,
              categoryId: product.categoryId,
              salePrice: product.salePrice,
              listPrice: product.listPrice,
              quantity: product.quantity,
              productMainId: product.productMainId,
              currencyType: product.currencyType,
              attributes: product.attributes,
              brandId: null,
              barcode: product.barcode,
              dimensionalWeight: null,
              catalogId: product.catalogId,
            },
          );
        }
        products = await fetchN11({
          url: `ms/product-query?page=${products.pageable.pageNumber + 1}`,
          auth: ecommerceBrand.apiKey,
          secretyKey: ecommerceBrand.secretKey,
        });

        if (products.content.length === 0) {
          lastPage = true;
        }
      }
    }

    return products;
  }

  async createProducts(
    currentEcommerceBrand: BrandSettingsDocument,
    products: CreateN11ProductDto[],
  ) {
    for (const product of products) {
      await this.productsRepository.upsert(
        { barcode: product.barcode },
        product,
      );
    }

    this.createRemote(currentEcommerceBrand, products);
  }

  // CreateN11ProductDto[]
  mapProducts(products: any[]) {
    return products.map((product) => {
      return {
        barcode: product.barcode,
        title: product.title,
        description: product.description,
        listPrice: product.listPrice,
        salePrice: product.salePrice,
        currencyType: product.currencyType,
        quantity: product.quantity,
        attributes: product.attributes,
        images: product.images,
        brandId: product.brandId,
        categoryId: product.categoryId,
        productMainId: product.productMainId,
        catalogId: null,
      };
    });
  }

  async updateStatusOfProducts(
    currentEcommerceBrand: BrandSettingsDocument,
    batchRequestId: string,
  ) {
    const response = await fetchN11({
      url: `ms/product/task-details/page-query`,
      auth: currentEcommerceBrand.apiKey,
      secretyKey: currentEcommerceBrand.apiKey,
      method: 'POST',
      body: {
        taskId: batchRequestId,
        pageable: { page: 0, size: 1000 },
      },
    });

    for (const item of response.skus.items) {
      const barcode = item.barcode;
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
    currentEcommerceBrand: BrandSettingsDocument,
    products: CreateN11ProductDto[],
  ) {
    const response = await fetchN11({
      url: `ms/product/tasks/product-create`,
      auth: currentEcommerceBrand.apiKey,
      secretyKey: currentEcommerceBrand.apiKey,
      method: 'POST',
      body: {
        payload: {
          integrator: 'Ecommerce_dev',
          skus: this.mapProducts(products),
        },
      },
    });

    await this.historyRepository.create({
      ecommerceBrandId: products[0].ecommerceBrandId,
      batchId: response.askId,
      status: 'PENDING',
    });

    await this.updateStatusOfProducts(
      currentEcommerceBrand,
      response.batchRequestId,
    );
  }

  updateProduct(
    ecommerceBrand: BrandSettingsDocument,
    product: UpdateProductStockPriceDto,
  ) {
    this.productsRepository.findOneAndUpdate(
      {
        _id: product._id,
        ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
      },
      product,
    );

    this.updateStockPriceRemote(ecommerceBrand, [product]);
  }

  async updateStockPriceRemote(
    ecommerceBrand: BrandSettingsDocument,
    products: UpdateProductStockPriceDto[],
  ) {
    const response = await fetchN11({
      url: `ms/product/tasks/price-stock-update`,
      auth: ecommerceBrand.apiKey,
      secretyKey: ecommerceBrand.apiKey,
      method: 'POST',
      body: {
        payload: {
          integrator: 'Ecommerce_dev',
          skus: this.mapProducts(products),
        },
      },
    });

    await this.historyRepository.create({
      ecommerceBrandId: ecommerceBrand.ecommerceBrandId,
      batchId: response.askId,
      status: 'PENDING',
    });

    await this.updateStatusOfProducts(ecommerceBrand, response.batchRequestId);
  }

  async sendToPlatforms(
    currentEcommerceBrand: BrandSettingsDocument,
    barcodes: string[],
  ) {
    const products = await this.productsRepository.filter({
      barcode: { $in: barcodes },
      limit: 1000,
    });

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
          categoryName,
          productMainId,
        }),
      );
      this.ecommerceClient.emit(SYNC_PRODUCTS_WITH_TRENDYOL, productsData);
    }
  }
}
