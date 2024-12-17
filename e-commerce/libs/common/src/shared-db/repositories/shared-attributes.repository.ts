import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedAttributesDocument } from '@app/common/shared-db/models/shared-attributes.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class SharedAttributesRepository extends AbstractRepository<SharedAttributesDocument> {
    protected readonly logger = new Logger(SharedAttributesRepository.name);

    constructor(@InjectModel(SharedAttributesDocument.name, SHARED_CONNECTION) attributesModel: Model<SharedAttributesDocument>) {
        attributesModel.syncIndexes()
        super(attributesModel);
    }
}