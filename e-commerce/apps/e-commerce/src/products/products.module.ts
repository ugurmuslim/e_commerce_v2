import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
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
import { ProductsService } from './products.service';
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
        { name: SharedProductsDocument.name, schema: SharedProductSchema },
        { name: SharedCategoriesDocument.name, schema: SharedCategoriesSchema },
        { name: SharedBrandsDocument.name, schema: SharedBrandsSchema },
        { name: SharedAttributesDocument.name, schema: SharedAttributesSchema },
      ],
      SHARED_CONNECTION,
    ),
    DatabaseModule.forFeature([
      {
        name: ProductCreationErrorsDocument.name,
        schema: ProductCreationErrorsSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsCreationErrorsRepository,
    SharedProductsRepository,
    SharedAttributesRepository,
    SharedCategoriesRepository,
    SharedBrandsRepository,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
