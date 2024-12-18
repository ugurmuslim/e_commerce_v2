import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception.filter';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3010', // Specify allowed origin(s)
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow credentials like cookies, authorization headers
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'e-commerce',
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow('HTTP_PORT'));
}

bootstrap();
