import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule, N11_SERVICE, TRENDYOL_SERVICE } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: TRENDYOL_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'trendyol',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: N11_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'n11',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [JobsService],
})
export class JobsModule {}
