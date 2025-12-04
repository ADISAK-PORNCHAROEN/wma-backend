import { Test, TestingModule } from '@nestjs/testing';
import { AssetTransfersService } from './asset-transfers.service';

describe('AssetTransfersService', () => {
  let service: AssetTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetTransfersService],
    }).compile();

    service = module.get<AssetTransfersService>(AssetTransfersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
