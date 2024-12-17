import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsDocument } from '../models/products.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class ProductsRepository extends AbstractRepository<ProductsDocument> {
  protected readonly logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectModel(ProductsDocument.name, DEFAULT_CONNECTION)
    productModel: Model<ProductsDocument>,
  ) {
    super(productModel);
  }

  async createProduct(document: Omit<ProductsDocument, '_id'>): Promise<{
    message?: string;
    success: boolean;
  }> {
    try {
      await this.create(document);
      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message); // Log only the message
        return {
          success: false,
          message: error.message,
        };
      } else {
        this.logger.error('An unknown error occurred');
        return {
          success: false,
          message: 'An unknown error occurred',
        };
      }
    }
  }
}
