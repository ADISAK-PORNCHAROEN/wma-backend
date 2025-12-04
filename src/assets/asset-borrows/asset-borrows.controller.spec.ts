import { Test, TestingModule } from '@nestjs/testing';
import { AssetBorrowsController } from './asset-borrows.controller';
import { AssetBorrowsService } from './asset-borrows.service';

describe('AssetBorrowsController', () => {
  let controller: AssetBorrowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetBorrowsController],
      providers: [AssetBorrowsService],
    }).compile();

    controller = module.get<AssetBorrowsController>(AssetBorrowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
