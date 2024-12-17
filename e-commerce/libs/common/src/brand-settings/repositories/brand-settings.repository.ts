import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class BrandSettingsRepository extends AbstractRepository<BrandSettingsDocument> {
  protected readonly logger = new Logger(BrandSettingsRepository.name);

  constructor(
    @InjectModel(BrandSettingsDocument.name, DEFAULT_CONNECTION)
    brandSettingsModel: Model<BrandSettingsDocument>,
  ) {
    super(brandSettingsModel);
  }
}
