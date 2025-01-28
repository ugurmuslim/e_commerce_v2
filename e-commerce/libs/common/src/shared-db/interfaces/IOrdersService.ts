import { OrderFilterDto } from '@app/common';

export interface IOrdersService<T> {
  getOrder(ecommerceBrandId: string, id: string): Promise<T>;
  getCounts(ecommerceBrandId: string): Promise<number>;
  getOrders(ecommerceBrandId: string, filter: OrderFilterDto): Promise<T[]>;
}
