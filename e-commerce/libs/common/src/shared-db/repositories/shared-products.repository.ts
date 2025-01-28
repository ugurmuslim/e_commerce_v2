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
    @InjectModel(SharedProductsDocument.name, SHARED_CONNECTION)
    productModel: Model<SharedProductsDocument>,
  ) {
    super(productModel);
  }

  async createProduct(
    document: Omit<SharedProductsDocument, '_id'>,
  ): Promise<void> {
    try {
      await this.create(document); // Assuming this is a method that interacts with DB or another service
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Error creating product:', error.stack);
        throw new Error(error.message);
      } else {
        this.logger.error('Error creating product:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  }
}
