import { Test, TestingModule } from '@nestjs/testing';
import { N11Controller } from './n11.controller';
import { N11Service } from './n11.service';

describe('N11Controller', () => {
  let n11Controller: N11Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [N11Controller],
      providers: [N11Service],
    }).compile();

    n11Controller = app.get<N11Controller>(N11Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(n11Controller.getHello()).toBe('Hello World!');
    });
  });
});
