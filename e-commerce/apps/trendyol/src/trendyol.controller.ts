import { Controller, UsePipes } from '@nestjs/common';
import { TrendyolService } from './trendyol.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AcknowledgePipe } from '@app/common/pipes/acknowledge-pipe';

@Controller()
export class TrendyolController {
  constructor(private readonly trendyolService: TrendyolService) {}

  @MessagePattern('getBrands')
  @UsePipes(AcknowledgePipe)
  async getBrands(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();

    const originalMessage = context.getMessage();

    const response = this.trendyolService.getBrands();

    channel.ack(originalMessage);

    return response;
  }

  @MessagePattern('getCategories')
  @UsePipes(AcknowledgePipe)
  async getCategories(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();

    const originalMessage = context.getMessage();

    const response = this.trendyolService.getCategories();

    channel.ack(originalMessage);

    return response;
  }

  @MessagePattern('getCategoryAttributes')
  @UsePipes(AcknowledgePipe)
  async getCategoryAttributes(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    return this.trendyolService.getCategoryAttributes(data.id);
  }
}
