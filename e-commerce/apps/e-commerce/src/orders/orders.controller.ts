import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern } from '@nestjs/microservices';
import {
  AbstractOrdersController,
  OrderSyncDto,
  TRENDYOL_ORDER_CREATED,
} from '@app/common';
import { OrderSyncRequestDto } from '@app/common/dto/order-sync.dto';

@Controller('orders')
export class OrdersController extends AbstractOrdersController<OrdersService> {
  constructor(protected readonly ordersService: OrdersService) {
    super();
  }

  @EventPattern(TRENDYOL_ORDER_CREATED)
  async syncOrders(
    @Body() payload: { ecommerceBrandId: string; data: OrderSyncDto[] },
  ) {
    const { ecommerceBrandId, data } = payload;
    return await this.ordersService.syncOrders(ecommerceBrandId, data);
  }
}
