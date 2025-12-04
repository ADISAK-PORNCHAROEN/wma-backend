import { Module } from '@nestjs/common';
import { AssetTransfersService } from './asset-transfers.service';
import { AssetTransfersController } from './asset-transfers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetTransfer } from './entities/asset-transfer.entity';
import { Asset } from '../asset/entities/asset.entity';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetTransfer, Asset]), AssetModule],
  controllers: [AssetTransfersController],
  providers: [AssetTransfersService],
})
export class AssetTransfersModule {}
