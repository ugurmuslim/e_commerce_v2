import { NestFactory } from '@nestjs/core';
import { N11Module } from './n11.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(N11Module);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not defined in the DTO
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'n11',
      noAck: false,
    },
  })
  app.useLogger(app.get(Logger))
  await app.startAllMicroservices()
  await app.listen(configService.getOrThrow('HTTP_PORT'));
}
bootstrap();
