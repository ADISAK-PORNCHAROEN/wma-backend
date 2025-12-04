import { Module } from '@nestjs/common';
import { AssetDisposalsService } from './asset-disposals.service';
import { AssetDisposalsController } from './asset-disposals.controller';
import { Asset } from '../asset/entities/asset.entity';
import { AssetDisposal } from './entities/asset-disposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetDisposal, Asset]), AssetModule],
  controllers: [AssetDisposalsController],
  providers: [AssetDisposalsService],
})
export class AssetDisposalsModule {}
