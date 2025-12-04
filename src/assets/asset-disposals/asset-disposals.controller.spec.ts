import { Test, TestingModule } from '@nestjs/testing';
import { AssetDisposalsController } from './asset-disposals.controller';
import { AssetDisposalsService } from './asset-disposals.service';

describe('AssetDisposalsController', () => {
  let controller: AssetDisposalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetDisposalsController],
      providers: [AssetDisposalsService],
    }).compile();

    controller = module.get<AssetDisposalsController>(AssetDisposalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
