import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  N11_ORDER_SYNC_JOB,
  N11_SERVICE,
  TRENDYOL_ORDER_SYNC_JOB,
  TRENDYOL_SERVICE,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @Inject(TRENDYOL_SERVICE) private readonly trendyolClient: ClientProxy,
    @Inject(N11_SERVICE) private readonly n11Client: ClientProxy,
  ) {
    this.logger.debug('JobsService initialized');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.trendyolClient.emit(TRENDYOL_ORDER_SYNC_JOB, {});
    // this.n11Client.emit(N11_ORDER_SYNC_JOB, {});
  }
}
