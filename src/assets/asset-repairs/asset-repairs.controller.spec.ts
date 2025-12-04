import { Test, TestingModule } from '@nestjs/testing';
import { AssetRepairsController } from './asset-repairs.controller';
import { AssetRepairsService } from './asset-repairs.service';

describe('AssetRepairsController', () => {
  let controller: AssetRepairsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetRepairsController],
      providers: [AssetRepairsService],
    }).compile();

    controller = module.get<AssetRepairsController>(AssetRepairsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
