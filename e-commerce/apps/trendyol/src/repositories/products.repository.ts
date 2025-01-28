import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
