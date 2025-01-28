import mongoose from 'mongoose';
import { IOrdersService } from '@app/common/shared-db/interfaces/IOrdersService';
import { OrderFilterDto } from '@app/common/dto';
import { IRepository } from '@app/common/shared-db/interfaces/IRepository';

export abstract class AbstractOrdersService<T extends IRepository>
  implements IOrdersService<T>
{
  protected abstract readonly ordersRepository: T;

  async getOrder(ecommerceBrandId: string, id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return await this.ordersRepository.findOne({
      ecommerceBrandId,
      _id: objectId,
    });
  }

  async getCounts(ecommerceBrandId: string) {
    return await this.ordersRepository.count({
      ecommerceBrandId: ecommerceBrandId,
    });
  }

  async getOrders(ecommerceBrandId: string, filter: OrderFilterDto) {
    const filterQuery = {
      ...filter,
      ecommerceBrandId: ecommerceBrandId,
    };
    return await this.ordersRepository.filter(filterQuery);
  }
}
