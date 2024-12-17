import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {EventPattern} from '@nestjs/microservices';
import {CurrentUser, JwtAuthGuard, TRENDYOL_ORDER_CREATED, UserDto} from '@app/common';
import {OrderSyncDto} from '@app/common/dto/order-sync.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @EventPattern(TRENDYOL_ORDER_CREATED)
    async syncOrders(@Body() data: OrderSyncDto) {
        return await this.ordersService.syncOrders(data);
    }

    @Get('count')
    @UseGuards(JwtAuthGuard)
    async getCounts(@CurrentUser() currentUser: UserDto) {
        return await this.ordersService.getCounts(currentUser._id);
    }
}
