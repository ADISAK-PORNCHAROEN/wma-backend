import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module'; 
import { AssetBorrowsModule } from './asset-borrows/asset-borrows.module';
import { AssetDisposalsModule } from './asset-disposals/asset-disposals.module';
import { AssetRepairsModule } from './asset-repairs/asset-repairs.module';
import { AssetTransfersModule } from './asset-transfers/asset-transfers.module';

@Module({
  imports: [
    AssetModule,
    AssetBorrowsModule,
    AssetDisposalsModule,
    AssetRepairsModule,
    AssetTransfersModule,
  ],
})
export class AssetsModule {}