import { Test, TestingModule } from '@nestjs/testing';
import { AssetTransfersController } from './asset-transfers.controller';
import { AssetTransfersService } from './asset-transfers.service';

describe('AssetTransfersController', () => {
  let controller: AssetTransfersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetTransfersController],
      providers: [AssetTransfersService],
    }).compile();

    controller = module.get<AssetTransfersController>(AssetTransfersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
