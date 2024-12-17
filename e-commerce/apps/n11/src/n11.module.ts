import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  BrandSettingsModule,
  DatabaseModule,
  HealthModule,
  LoggerModule,
  QueueModule,
  SharedDbModule,
} from '@app/common';
import * as Joi from 'joi';
import { N11Controller } from './n11.controller';
import { N11Service } from './n11.service';
import {
  CategoriesDocument,
  CategoriesSchema,
} from './models/categories.schema';
import {
  AttributesDocument,
  AttributesSchema,
} from './models/attributes.schema';
import { BrandsDocument, BrandsSchema } from './models/brands.schema';
import { BrandsRepository } from './repositories/brands.repository';
import { AttributesRepository } from './repositories/attributes.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    LoggerModule,
    HealthModule,
    DatabaseModule,
    SharedDbModule,
    OrdersModule,
    QueueModule,
    BrandSettingsModule,
    ProductsModule,
    DatabaseModule.forFeature([
      { name: CategoriesDocument.name, schema: CategoriesSchema },
      { name: AttributesDocument.name, schema: AttributesSchema },
      { name: BrandsDocument.name, schema: BrandsSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        SHARED_MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [N11Controller],
  providers: [
    N11Service,
    CategoriesRepository,
    AttributesRepository,
    BrandsRepository,
  ],
})
export class N11Module {}
