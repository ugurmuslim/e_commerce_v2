import { NestFactory } from '@nestjs/core';
import { HepsiburadaModule } from './hepsiburada.module';

async function bootstrap() {
  const app = await NestFactory.create(HepsiburadaModule);
  await app.listen(3000);
}
bootstrap();
