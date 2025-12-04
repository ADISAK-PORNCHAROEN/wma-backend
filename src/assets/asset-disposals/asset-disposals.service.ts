import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateAssetDisposalDto } from './dto/create-asset-disposal.dto';
import { AssetDisposal } from './entities/asset-disposal.entity';
import { Asset } from '../asset/entities/asset.entity';
import { AssetStatus } from '../asset/asset.enums';
import { UpdateAssetDisposalDto } from './dto/update-asset-disposal.dto';
import { AssetService } from '../asset/asset.service';


@Injectable()
export class AssetDisposalsService {
  constructor(
    @InjectRepository(AssetDisposal)
    private readonly disposalRepo: Repository<AssetDisposal>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    private dataSource: DataSource,
    private readonly assetsService: AssetService,
  ) {}

  async create(dto: CreateAssetDisposalDto) {
    return await this.dataSource.transaction(async (manager) => {
      const asset = await manager.findOne(Asset, { where: { id: dto.assetId } });
      if (!asset) throw new NotFoundException('ไม่พบทรัพย์สิน');
      
      // เช็คว่าเคยจำหน่ายไปแล้วหรือยัง
      if (asset.status === AssetStatus.SOLD) {
         throw new BadRequestException('ทรัพย์สินนี้ถูกจำหน่ายไปแล้ว');
      }

      const currentYear = new Date().getFullYear() + 543;
      const newId = await this.assetsService.generateSystemId('DS', currentYear);

      // 1. สร้างประวัติการจำหน่าย
      const disposal = manager.create(AssetDisposal, {
        id: newId,
        ...dto
      });
      await manager.save(disposal);

      asset.status = AssetStatus.SOLD;

      await manager.save(asset);
      return disposal;
    });
  }

  async findAll() {
    return this.disposalRepo.find({ relations: ['asset'], order: { disposalDate: 'DESC' } });
  }

  findOne(id: string) {
    return this.disposalRepo.find({ where: {id}, relations: ['asset'], order: { disposalDate: 'DESC' } });
  }

  update(id: number, updateAssetDisposalDto: UpdateAssetDisposalDto) {
    return `This action updates a #${id} assetDisposal`;
  }

  remove(id: number) {
    return `This action removes a #${id} assetDisposal`;
  }
}
