import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';
import { AbstractOrdersController, N11_ORDER_SYNC_JOB } from '@app/common';

@Controller('orders')
export class OrdersController extends AbstractOrdersController<OrdersService> {
  constructor(protected readonly ordersService: OrdersService) {
    super();
  }

  @MessagePattern(N11_ORDER_SYNC_JOB)
  async getRemote() {
    this.ordersService.getRemote();
  }
}
