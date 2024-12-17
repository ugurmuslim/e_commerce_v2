import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { DatabaseModule, QueueModule } from '@app/common';

import {
  ProductCreationErrorsDocument,
  ProductCreationErrorsSchema,
} from '../models/products-creation-errors.schema';
import { ProductsCreationErrorsRepository } from '../repositories/product-creation-errors.repository';
import { SharedProductsRepository } from '@app/common/shared-db/repositories/shared-products.repository';
import { SharedAttributesRepository } from '@app/common/shared-db/repositories/shared-attributes.repository';
import { SharedCategoriesRepository } from '@app/common/shared-db/repositories/shared-categories.repository';
import { SharedBrandsRepository } from '@app/common/shared-db/repositories/shared-brands.repository';
import { CategoriesService } from './categories.service';
import {
  SharedProductSchema,
  SharedProductsDocument,
} from '@app/common/shared-db/models/shared-products.schema';
import {
  SharedCategoriesDocument,
  SharedCategoriesSchema,
} from '@app/common/shared-db/models/shared-categories.schema';
import {
  SharedBrandsDocument,
  SharedBrandsSchema,
} from '@app/common/shared-db/models/shared-brands.schema';
import {
  SharedAttributesDocument,
  SharedAttributesSchema,
} from '@app/common/shared-db/models/shared-attributes.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';

@Module({
  imports: [
    QueueModule,
    DatabaseModule.forFeature(
      [
        { name: SharedCategoriesDocument.name, schema: SharedCategoriesSchema },
        { name: SharedAttributesDocument.name, schema: SharedAttributesSchema },
      ],
      SHARED_CONNECTION,
    ),
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    SharedAttributesRepository,
    SharedCategoriesRepository,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
