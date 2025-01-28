import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from '../repositories/orders.repository';
import { BrandSettingsModule, DatabaseModule, QueueModule } from '@app/common';
import { OrdersDocument, OrdersSchema } from '../models/orders.schema';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    QueueModule,
    BrandSettingsModule,
    ProductsModule,
    DatabaseModule.forFeature([
      { name: OrdersDocument.name, schema: OrdersSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
