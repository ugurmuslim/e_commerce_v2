import { Injectable } from '@nestjs/common';

@Injectable()
export class HepsiburadaService {
  getHello(): string {
    return 'Hello World!';
  }
}
