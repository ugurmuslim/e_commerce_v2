import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesDocument } from '../models/categories.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class CategoriesRepository extends AbstractRepository<CategoriesDocument> {
  protected readonly logger = new Logger(CategoriesRepository.name);

  constructor(@InjectModel(CategoriesDocument.name, DEFAULT_CONNECTION) categoriesModel: Model<CategoriesDocument>) {
    categoriesModel.syncIndexes()
    super(categoriesModel);
  }
}