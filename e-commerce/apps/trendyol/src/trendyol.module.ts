import { Module } from '@nestjs/common';
import { TrendyolController } from './trendyol.controller';
import { TrendyolService } from './trendyol.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AUTH_SERVICE,
  DatabaseModule,
  ECOMMERCE_SERVICE,
  HealthModule,
  LoggerModule,
  SharedDbModule,
} from '@app/common';
import * as Joi from 'joi';
import { BrandSettingsModule } from '@app/common/brand-settings/brand-settings.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { QueueModule } from '@app/common/queue/queue.module';

@Module({
  imports: [
    LoggerModule,
    HealthModule,
    DatabaseModule,
    BrandSettingsModule,
    OrdersModule,
    SharedDbModule,
    ProductsModule,
    QueueModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        SHARED_MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [TrendyolController],
  providers: [TrendyolService],
})
export class TrendyolModule {}
