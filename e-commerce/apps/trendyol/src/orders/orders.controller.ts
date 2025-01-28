import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';
import { AbstractOrdersController, TRENDYOL_ORDER_SYNC_JOB } from '@app/common';
import { BrandSettingsGuard } from '@app/common/brand-settings/brand-settings.guard';
import { CurrentEcommerceBrand } from '@app/common/decorators/current-ecommerce-brand.decorator';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { CreateTrendyolOrderDto } from '../dto/create-order.dto';

@Controller('orders')
export class OrdersController extends AbstractOrdersController<OrdersService> {
  constructor(protected readonly ordersService: OrdersService) {
    super();
  }

  @MessagePattern(TRENDYOL_ORDER_SYNC_JOB)
  async getRemote() {
    this.ordersService.getRemote();
  }

  @Post(':ecommerceBrandId/webhhook')
  @UseGuards(BrandSettingsGuard)
  async getWebhook(
    @CurrentEcommerceBrand() currentEcommerceBrand: BrandSettingsDocument,
    @Body() data: CreateTrendyolOrderDto,
  ) {
    return await this.ordersService.syncOrder(currentEcommerceBrand, data);
  }
}
