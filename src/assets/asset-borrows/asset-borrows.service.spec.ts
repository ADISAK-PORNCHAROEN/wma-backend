import { Test, TestingModule } from '@nestjs/testing';
import { AssetBorrowsService } from './asset-borrows.service';

describe('AssetBorrowsService', () => {
  let service: AssetBorrowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetBorrowsService],
    }).compile();

    service = module.get<AssetBorrowsService>(AssetBorrowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
