import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BrandSettingsModule, DatabaseModule, QueueModule } from '@app/common';
import { ProductSchema, ProductsDocument } from '../models/products.schema';
import { OrdersDocument, OrdersSchema } from '../models/orders.schema';
import { HistoryDocument, HistorySchema } from '../models/history.schema';
import { ProductsRepository } from '../repositories/products.repository';
import { HistoryRepository } from '../repositories/history.repository';

@Module({
  imports: [
    BrandSettingsModule,
    QueueModule,
    DatabaseModule.forFeature([
      { name: ProductsDocument.name, schema: ProductSchema },
      { name: OrdersDocument.name, schema: OrdersSchema },
      { name: HistoryDocument.name, schema: HistorySchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, HistoryRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
