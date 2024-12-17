import { NestFactory } from '@nestjs/core';
import { JobsModule } from './jobs.module';
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { JobsService } from './jobs.service';

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not defined in the DTO
    }),
  );
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'jobs',
    },
  });
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  app.listen(3017)
}

bootstrap();
