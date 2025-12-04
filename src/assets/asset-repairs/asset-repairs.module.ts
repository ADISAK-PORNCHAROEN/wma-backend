import { Module } from '@nestjs/common';
import { AssetRepairsService } from './asset-repairs.service';
import { AssetRepairsController } from './asset-repairs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../asset/entities/asset.entity';
import { AssetRepair } from './entities/asset-repair.entity';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetRepair, Asset]), AssetModule],
  controllers: [AssetRepairsController],
  providers: [AssetRepairsService],
})
export class AssetRepairsModule {}
