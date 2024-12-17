import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsDocument } from '../models/products.schema';
import { OrdersDocument } from '../models/orders.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class OrdersRepository extends AbstractRepository<OrdersDocument> {
    protected readonly logger = new Logger(OrdersRepository.name);

    constructor(@InjectModel(OrdersDocument.name,DEFAULT_CONNECTION) ordersModel: Model<OrdersDocument>) {
        super(ordersModel);
    }
}