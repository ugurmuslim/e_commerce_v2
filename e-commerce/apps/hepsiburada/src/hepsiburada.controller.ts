import { Controller, Get } from '@nestjs/common';
import { HepsiburadaService } from './hepsiburada.service';

@Controller()
export class HepsiburadaController {
  constructor(private readonly hepsiburadaService: HepsiburadaService) {}

  @Get()
  getHello(): string {
    return this.hepsiburadaService.getHello();
  }
}
