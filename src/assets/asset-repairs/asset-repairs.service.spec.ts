import { Test, TestingModule } from '@nestjs/testing';
import { AssetRepairsService } from './asset-repairs.service';

describe('AssetRepairsService', () => {
  let service: AssetRepairsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetRepairsService],
    }).compile();

    service = module.get<AssetRepairsService>(AssetRepairsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
