import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedProductsDocument } from '@app/common/shared-db/models/shared-products.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class SharedProductsRepository extends AbstractRepository<SharedProductsDocument> {
  protected readonly logger = new Logger(SharedProductsRepository.name);

  constructor(
    @InjectModel(SharedProductsDocument.name,SHARED_CONNECTION) productModel: Model<SharedProductsDocument>,
  ) {
    super(productModel);
  }

  async createProduct(document: Omit<SharedProductsDocument, '_id'>): Promise<{
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
