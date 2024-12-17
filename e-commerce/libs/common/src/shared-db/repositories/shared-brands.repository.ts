import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedBrandsDocument } from '@app/common/shared-db/models/shared-brands.schema';
import { SHARED_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class SharedBrandsRepository extends AbstractRepository<SharedBrandsDocument> {
  protected readonly logger = new Logger(SharedBrandsRepository.name);

  constructor(
    @InjectModel(SharedBrandsDocument.name, SHARED_CONNECTION)
    brandsModel: Model<SharedBrandsDocument>,
  ) {
    brandsModel.syncIndexes();
    super(brandsModel);
  }
}
