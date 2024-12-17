import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { ProxyMiddleware } from './proxy.middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.enableCors({
    origin: 'http://localhost:3010', // Specify allowed origin(s)
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow credentials like cookies, authorization headers
  });
  app.use(new ProxyMiddleware().use);

  await app.listen(3000);
}
bootstrap();
