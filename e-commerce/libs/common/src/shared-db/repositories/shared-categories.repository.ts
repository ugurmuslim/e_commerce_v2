import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedCategoriesDocument } from '@app/common/shared-db/models/shared-categories.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class SharedCategoriesRepository extends AbstractRepository<SharedCategoriesDocument> {
  protected readonly logger = new Logger(SharedCategoriesRepository.name);

  constructor(
    @InjectModel(SharedCategoriesDocument.name, SHARED_CONNECTION)
    private readonly categoriesModel: Model<SharedCategoriesDocument>,
  ) {
    super(categoriesModel);
  }

  // async filter(
  //   filterQuery: FilterQuery<SharedCategoriesDocument>,
  //   limit: number = 10,
  // ): Promise<any> {
  //   const filter: any = {};
  //   delete filterQuery.page;
  //   const projection: any = { _id: 0 };
  //   projection.subCategories = 0;
  //
  //   if (filterQuery.name) {
  //     filter.name = filterQuery.name; // Exact match
  //   }
  //
  //   if (filterQuery.ids) {
  //     filter.id = filterQuery.ids[0];
  //     projection.subCategories = 1;
  //   }
  //
  //   return await this.categoriesModel
  //     .find(filter, projection) // 'i' for case-insensitive
  //     .lean<CategoriesDocument[]>(true);
  // }
}
