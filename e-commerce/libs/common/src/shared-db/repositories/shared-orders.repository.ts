import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SharedOrdersDocument } from '@app/common/shared-db/models/shared-orders.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class SharedOrdersRepository extends AbstractRepository<SharedOrdersDocument> {
  protected readonly logger = new Logger(SharedOrdersRepository.name);

  constructor(
    @InjectModel(SharedOrdersDocument.name, SHARED_CONNECTION) ordersModel: Model<SharedOrdersDocument>,
  ) {
    super(ordersModel);
  }

}
