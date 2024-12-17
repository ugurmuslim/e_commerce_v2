import { Module } from '@nestjs/common';
import { HepsiburadaController } from './hepsiburada.controller';
import { HepsiburadaService } from './hepsiburada.service';

@Module({
  imports: [],
  controllers: [HepsiburadaController],
  providers: [HepsiburadaService],
})
export class HepsiburadaModule {}
