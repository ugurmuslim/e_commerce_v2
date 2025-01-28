import { Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  JwtAuthGuard,
  OrderFilterDto,
  UserDto,
} from '@app/common';
import { IOrdersController } from '@app/common/shared-db/interfaces/IOrderContoller';

export abstract class AbstractOrdersController<T extends IOrdersController> {
  protected abstract readonly ordersService: T;

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async getCounts(@CurrentUser() currentUser: UserDto) {
    return await this.ordersService.getCounts(currentUser._id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrder(@CurrentUser() currentUser: UserDto, @Param('id') id: string) {
    return await this.ordersService.getOrder(currentUser._id, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @CurrentUser() currentUser: UserDto,
    @Query() filter: OrderFilterDto,
  ) {
    return await this.ordersService.getOrders(currentUser._id, filter);
  }
}
