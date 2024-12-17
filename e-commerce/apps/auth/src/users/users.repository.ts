import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UsersDocument } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DEFAULT_CONNECTION } from '@app/common/constants/connections';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(UsersDocument.name, DEFAULT_CONNECTION) userModel: Model<UsersDocument>) {
    super(userModel);
  }
}