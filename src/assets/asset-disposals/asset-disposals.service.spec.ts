import { Test, TestingModule } from '@nestjs/testing';
import { AssetDisposalsService } from './asset-disposals.service';

describe('AssetDisposalsService', () => {
  let service: AssetDisposalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetDisposalsService],
    }).compile();

    service = module.get<AssetDisposalsService>(AssetDisposalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
