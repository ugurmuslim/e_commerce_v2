import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from '../repositories/orders.repository';
import { BrandSettingsModule, DatabaseModule } from '@app/common';

import { QueueModule } from '@app/common/queue/queue.module';
import { ProductsModule } from '../products/products.module';
import { OrdersDocument, OrdersSchema } from '../models/orders.schema';

@Module({
  imports: [
    BrandSettingsModule,
    QueueModule,
    DatabaseModule.forFeature([
      { name: OrdersDocument.name, schema: OrdersSchema },
    ]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
