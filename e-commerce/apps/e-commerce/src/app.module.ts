import { Module } from '@nestjs/common';
import {
  DatabaseModule,
  LoggerModule,
  QueueModule,
  SharedDbModule,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    SharedDbModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    QueueModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
