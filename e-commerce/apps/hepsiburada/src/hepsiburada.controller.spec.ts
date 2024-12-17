import { Test, TestingModule } from '@nestjs/testing';
import { HepsiburadaController } from './hepsiburada.controller';
import { HepsiburadaService } from './hepsiburada.service';

describe('HepsiburadaController', () => {
  let hepsiburadaController: HepsiburadaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HepsiburadaController],
      providers: [HepsiburadaService],
    }).compile();

    hepsiburadaController = app.get<HepsiburadaController>(HepsiburadaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hepsiburadaController.getHello()).toBe('Hello World!');
    });
  });
});
