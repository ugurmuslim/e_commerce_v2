import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';
import { N11_ORDER_SYNC_JOB } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(N11_ORDER_SYNC_JOB)
  async getRemote() {
    this.ordersService.getRemote();
  }
}
