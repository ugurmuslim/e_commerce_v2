import { OrderFilterDto } from '@app/common';

export interface IOrdersController {
  getCounts(userId: string): Promise<number>;

  getOrder(userId: string, orderId: string): Promise<any>;

  getOrders(userId: string, filter: OrderFilterDto): Promise<any>;
}
