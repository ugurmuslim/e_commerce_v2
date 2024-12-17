import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsDocument } from '../models/products.schema';
import { ProductCreationErrorsDocument, ProductCreationErrorsSchema } from '../models/products-creation-errors.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class ProductsCreationErrorsRepository extends AbstractRepository<ProductCreationErrorsDocument> {
  protected readonly logger = new Logger(ProductsCreationErrorsRepository.name);

  constructor(
    @InjectModel(ProductCreationErrorsDocument.name,DEFAULT_CONNECTION) productCreationErrorsModel: Model<ProductCreationErrorsDocument>,
  ) {
    super(productCreationErrorsModel);
  }
}
