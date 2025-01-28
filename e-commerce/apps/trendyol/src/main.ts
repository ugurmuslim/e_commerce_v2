import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { TrendyolModule } from './trendyol.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from '@app/common/exceptions/catch-everything.filter';
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(TrendyolModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3010', // Specify allowed origin(s)
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow credentials like cookies, authorization headers
  });
  //   const httpAdapterHost = app.get(HttpAdapterHost); // Get the whole HttpAdapterHost
  // app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'trendyol',
      noAck: false,
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  app.listen(configService.getOrThrow('HTTP_PORT'));
}

bootstrap();
