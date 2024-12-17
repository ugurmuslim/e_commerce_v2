import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryDocument } from '../models/history.schema';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class HistoryRepository extends AbstractRepository<HistoryDocument> {
  protected readonly logger = new Logger(HistoryRepository.name);

  constructor(
    @InjectModel(HistoryDocument.name, DEFAULT_CONNECTION)
    historyModel: Model<HistoryDocument>,
  ) {
    super(historyModel);
  }
}
