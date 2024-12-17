import { Module } from '@nestjs/common';
import { SharedProductsRepository } from '@app/common/shared-db/repositories/shared-products.repository';
import { SharedOrdersRepository } from '@app/common/shared-db/repositories/shared-orders.repository';
import { SharedBrandsRepository } from '@app/common/shared-db/repositories/shared-brands.repository';
import { SharedAttributesRepository } from '@app/common/shared-db/repositories/shared-attributes.repository';
import { SharedCategoriesRepository } from '@app/common/shared-db/repositories/shared-categories.repository';
import { DatabaseModule } from '@app/common/database';
import {
  SharedProductSchema,
  SharedProductsDocument,
} from '@app/common/shared-db/models/shared-products.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';
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
import {
  SharedOrdersDocument,
  SharedOrdersSchema,
} from '@app/common/shared-db/models/shared-orders.schema';

@Module({
  imports: [
    DatabaseModule.forFeature(
      [
        { name: SharedProductsDocument.name, schema: SharedProductSchema },
        { name: SharedCategoriesDocument.name, schema: SharedCategoriesSchema },
        { name: SharedBrandsDocument.name, schema: SharedBrandsSchema },
        { name: SharedAttributesDocument.name, schema: SharedAttributesSchema },
        { name: SharedOrdersDocument.name, schema: SharedOrdersSchema },
      ],
      SHARED_CONNECTION,
    ),
  ],
  providers: [
    SharedProductsRepository,
    SharedOrdersRepository,
    SharedBrandsRepository,
    SharedAttributesRepository,
    SharedCategoriesRepository,
  ],
  exports: [
    SharedProductsRepository,
    SharedOrdersRepository,
    SharedBrandsRepository,
    SharedAttributesRepository,
    SharedCategoriesRepository,
  ],
})
export class SharedDbModule {}
