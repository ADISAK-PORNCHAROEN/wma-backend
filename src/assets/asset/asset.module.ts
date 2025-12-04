import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetBorrow } from '../asset-borrows/entities/asset-borrow.entity';
import { AssetDisposal } from '../asset-disposals/entities/asset-disposal.entity';
import { AssetRepair } from '../asset-repairs/entities/asset-repair.entity';
import { AssetTransfer } from '../asset-transfers/entities/asset-transfer.entity';
import { RunningSequence } from './entities/running-sequence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asset,
      AssetTransfer,
      AssetBorrow,
      AssetRepair,
      AssetDisposal,
      RunningSequence
    ])
  ],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
