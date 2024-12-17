import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsDocument } from '../models/products.schema';
import { AttributesDocument } from '../models/attributes.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class AttributesRepository extends AbstractRepository<AttributesDocument> {
    protected readonly logger = new Logger(AttributesRepository.name);

    constructor(@InjectModel(AttributesDocument.name,DEFAULT_CONNECTION) attributesModel: Model<AttributesDocument>) {
        attributesModel.syncIndexes()
        super(attributesModel);
    }
}