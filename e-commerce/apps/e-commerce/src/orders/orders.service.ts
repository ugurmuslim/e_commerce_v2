import { Injectable } from '@nestjs/common';
import { OrderSyncDto } from '@app/common/dto/order-sync.dto';
import { ProductsService } from '../products/products.service';
import { SharedOrdersRepository } from '@app/common/shared-db/repositories/shared-orders.repository';
import { AbstractOrdersService } from '@app/common';

@Injectable()
export class OrdersService extends AbstractOrdersService<SharedOrdersRepository> {
  constructor(
    private readonly productsService: ProductsService,
    protected readonly ordersRepository: SharedOrdersRepository,
  ) {
    super();
  }

  async syncOrders(ecommerceBrandId: string, data: OrderSyncDto[]) {
    for (const order of data) {
      await this.ordersRepository.create({
        ...order,
        ecommerceBrandId,
      });

      for (const item of order.lines) {
        this.productsService.updateProductQuantity(
          item.barcode,
          item.quantity,
          ecommerceBrandId,
        );
      }
    }
  }
}
