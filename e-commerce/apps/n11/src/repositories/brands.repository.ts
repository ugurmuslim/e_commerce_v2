import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandsDocument } from '../models/brands.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class BrandsRepository extends AbstractRepository<BrandsDocument> {
    protected readonly logger = new Logger(BrandsRepository.name);

    constructor(@InjectModel(BrandsDocument.name,DEFAULT_CONNECTION) brandsModel: Model<BrandsDocument>) {
        brandsModel.syncIndexes()
        super(brandsModel);
    }
}