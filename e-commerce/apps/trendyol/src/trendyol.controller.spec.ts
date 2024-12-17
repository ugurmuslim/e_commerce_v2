import { Test, TestingModule } from '@nestjs/testing';
import { TrendyolController } from './trendyol.controller';
import { TrendyolService } from './trendyol.service';

describe('TrendyolController', () => {
  let trendyolController: TrendyolController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrendyolController],
      providers: [TrendyolService],
    }).compile();

    trendyolController = app.get<TrendyolController>(TrendyolController);
  });

  describe('root', () => {
  });
});
