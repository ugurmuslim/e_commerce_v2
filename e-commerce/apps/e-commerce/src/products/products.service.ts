import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProductRequestDto,
  N11_SERVICE,
  SYNC_PRODUCTS_WITH_ECOMMERCE,
  TRENDYOL_SERVICE,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import * as XLSX from 'xlsx';
import { ProductsCreationErrorsRepository } from '../repositories/product-creation-errors.repository';
import { SharedProductsRepository } from '@app/common/shared-db/repositories/shared-products.repository';
import { lastValueFrom } from 'rxjs';
import { SharedAttributesRepository } from '@app/common/shared-db/repositories/shared-attributes.repository';
import { SharedBrandsRepository } from '@app/common/shared-db/repositories/shared-brands.repository';
import { ProductsDocument } from '../../../trendyol/src/models/products.schema';
import { ProductFilterDto } from '../dto/product-filter-dto';
import { SharedCategoriesRepository } from '@app/common/shared-db/repositories/shared-categories.repository';
import { CategoryFilterDto } from '../dto/category-filter-dto';
import { BrandFilterDto } from '../dto/brand-filter-dto';
import { AttributesFilterDto } from '../dto/attributes-filter-dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsCreationErrorsRepository: ProductsCreationErrorsRepository,
    private readonly productsRepository: SharedProductsRepository,
    private readonly attributesRepository: SharedAttributesRepository,
    private readonly brandsRepository: SharedBrandsRepository,
    private readonly categoriesRepository: SharedCategoriesRepository,
    @Inject(TRENDYOL_SERVICE) private readonly trendyolClient: ClientProxy,
    @Inject(N11_SERVICE) private readonly n11Client: ClientProxy,
  ) {}

  async getProducts(ecommerceBrandId: string, filter: ProductFilterDto) {
    const filterQuery = {
      ...filter,
      ecommerceBrandId: ecommerceBrandId,
    };
    return await this.productsRepository.filter(filterQuery);
  }

  async createProducts(
    ecommerceBrandId: string,
    data: CreateProductRequestDto,
    file?: Express.Multer.File,
  ) {
    let products: any = [];
    const productsToEmit: ProductsDocument[] = [];
    products = await Promise.all(
      data.data.map(async (product) => {
        try {
          const category = await this.categoriesRepository.findOne({
            id: product.categoryId,
          });

          const brand = await this.brandsRepository.findOne({
            id: product.brandId,
          });

          if (!brand) {
            await this.productsCreationErrorsRepository.create({
              ...product,
              ecommerceBrandId,
              message: 'You must provide all required fields',
            });
          }

          if (!category) {
            await this.productsCreationErrorsRepository.create({
              ...product,
              ecommerceBrandId,
              message: 'You must provide all required fields',
            });
          }

          if (category) {
            // Iterate over the product attributes
            for (const attribute of product.attributes) {
              // Find the matching categoryAttribute from the MongoDB collection
              const categoryAttribute = await this.attributesRepository.findOne(
                {
                  id: category.id,
                },
              );

              if (categoryAttribute) {
                // Find the matching attribute objectS
                const matchingAttribute =
                  categoryAttribute.categoryAttributes.find(
                    (attr) => attr.attribute.id === attribute.id,
                  );

                if (matchingAttribute) {
                  attribute.name = matchingAttribute.attribute.name;
                }
              }
            }
          }
          return {
            ...product,
            ecommerceBrandId,
            categoryName: category?.name,
            brandName: brand?.name,
            barcode:
              product.barcode ??
              (Date.now() + Math.floor(Math.random() * 9000) + 1000)
                .toString()
                .slice(-8),
          };
        } catch (error) {
          console.error('Error processing product', product, error);
          return null; // or handle as needed
        }
      }),
    );

    if (file) {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const fileData = XLSX.utils.sheet_to_json(worksheet);
      products = this.transformProducts(fileData);
    }

    for (const product of products) {
      const creation = await this.productsRepository.createProduct(product);
      if (!creation.success) {
        await this.productsCreationErrorsRepository.create({
          ...product,
          message: 'You must provide all required fields',
        });
      } else {
        productsToEmit.push(product);
      }
    }

    if (productsToEmit.length > 0) {
      this.getClient('trendyol').emit(
        SYNC_PRODUCTS_WITH_ECOMMERCE,
        productsToEmit,
      );
      this.getClient('n11').emit(SYNC_PRODUCTS_WITH_ECOMMERCE, productsToEmit);
    }

    return products;
  }

  transformProducts(products) {
    return products.map((product) => {
      const transformedAttributes: {
        attributeId: number;
        customAttributeValue?: string;
        attributeValueId?: number;
      }[] = [];
      const transformedImages: { url: string }[] = [];

      // Extract attributes from the product
      Object.keys(product).forEach((key) => {
        if (key.startsWith('attributes') || key.startsWith('image')) {
          const value = product[key];
          const [attributeId, rawValue] = value
            .split('=')
            .map((item) => item.trim());

          if (isNaN(rawValue)) {
            transformedAttributes.push({
              attributeId: parseInt(attributeId, 10),
              customAttributeValue: rawValue,
            });
          } else {
            transformedAttributes.push({
              attributeId: parseInt(attributeId, 10),
              attributeValueId: parseInt(rawValue, 10),
            });
          }

          if (key.startsWith('image')) {
            transformedImages.push({
              url: product[key],
            });
          }

          delete product[key];
        }
      });

      return {
        ...product,
        attributes: transformedAttributes,
        images: transformedImages,
      };
    });
  }

  syncProducts(provider: string, products: ProductsDocument[]) {
    return this.getClient(provider).send('syncProducts', { products });
  }

  getClient(provider: string): ClientProxy {
    switch (provider) {
      case 'trendyol':
        return this.trendyolClient;
      case 'n11':
        return this.n11Client;
      default:
        return this.trendyolClient;
    }
  }

  async findAttributes(categories, provider) {
    for (const category of categories) {
      const attributes = await lastValueFrom(
        this.getClient(provider).send('getCategoryAttributes', {
          id: category.id,
        }),
      );

      await this.attributesRepository.create(attributes);

      if (category.subCategories.length > 0) {
        await this.findAttributes(category.subCategories, provider);
      }
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

  async getBrands(filter: BrandFilterDto) {
    const data = await this.brandsRepository.filter(filter);
    return data.data;
  }

  async getCount(ecommerceBrandId: string) {
    return await this.productsRepository.count({
      ecommerceBrandId: ecommerceBrandId,
    });
  }

  async getCategories(filterQuery: CategoryFilterDto) {
    const filter: any = {};

    if (filterQuery.name) {
      filter.name = { $regex: new RegExp(filterQuery.name, 'i') }; // Case-insensitive regex
    }

    const categories = await this.categoriesRepository.find(filter);

    return categories;
  }

  async getAttributes(filterQuery: AttributesFilterDto) {
    return await this.attributesRepository.findOne(filterQuery);
  }

  async getCategory(id: number) {
    const category = await this.categoriesRepository.findOne({ id });

    if (!category) {
      return null;
    }

    const subCategories = await this.categoriesRepository.find({
      parentId: category.id,
    });

    return {
      ...category,
      subCategories,
    };
  }

  async getProduct(barcode: string) {
    return await this.productsRepository.findOne({ barcode: barcode });
  }
}
