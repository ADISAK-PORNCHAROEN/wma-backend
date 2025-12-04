import { Module } from '@nestjs/common';
import { AssetBorrowsService } from './asset-borrows.service';
import { AssetBorrowsController } from './asset-borrows.controller';
import { Asset } from '../asset/entities/asset.entity';
import { AssetBorrow } from './entities/asset-borrow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetBorrow, Asset]), AssetModule],
  controllers: [AssetBorrowsController],
  providers: [AssetBorrowsService],
})
export class AssetBorrowsModule {}
