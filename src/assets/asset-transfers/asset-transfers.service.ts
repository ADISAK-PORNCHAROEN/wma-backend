import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateAssetTransferDto } from './dto/create-asset-transfer.dto';
import { AssetTransfer } from './entities/asset-transfer.entity';
import { UpdateAssetTransferDto } from './dto/update-asset-transfer.dto';
import { Asset } from '../asset/entities/asset.entity';
import { AssetService } from '../asset/asset.service';
import { DepartmentLabel } from '../../departments/departments.constants';

@Injectable()
export class AssetTransfersService {
  constructor(
    @InjectRepository(AssetTransfer)
    private readonly transferRepo: Repository<AssetTransfer>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    private readonly assetsService: AssetService, 
    private dataSource: DataSource,
  ) {}

  private transformAsset(asset: Asset) {
    return {
      ...asset,
      departmentLabel: DepartmentLabel[asset.department] || asset.department
    };
  }

  create(dto: CreateAssetTransferDto) {
    return this.dataSource.transaction(async (manager) => {
      // 1. หา Asset
      const asset = await manager.findOne(Asset, { where: { id: dto.assetId } });
      if (!asset) throw new NotFoundException('ไม่พบทรัพย์สิน');

      const currentYear = new Date().getFullYear() + 543;

      const newId = await this.assetsService.generateSystemId('TR', currentYear);

      // 2. บันทึกประวัติการย้าย
      const transfer = manager.create(AssetTransfer, {
        id: newId,
        ...dto,
        fromDept: asset.department, 
      });
      await manager.save(transfer);

      // 3. อัปเดต Asset แม่ (เปลี่ยนแผนกและสถานที่)
      asset.department = dto.toDept;
      await manager.save(asset);

      return transfer;
    });
  }

  async findAll() {
    const trans = await this.transferRepo.find({
      relations: ['asset'], 
      order: { transferDate: 'DESC' } 
    });

    // Map ข้อมูลเพื่อเพิ่ม Label ภาษาไทย
    return trans.map(tran => ({
      ...tran,
      fromDeptLabel: DepartmentLabel[tran.fromDept] || tran.fromDept,
      toDeptLabel: DepartmentLabel[tran.toDept] || tran.toDept,
      
      asset: tran.asset ? this.transformAsset(tran.asset) : null
    }));
  }

  async findOne(id: string) {
    const transfer = await this.transferRepo.findOne({
      where: { id },
      relations: ['asset'],
    });

    if (!transfer) {
      throw new NotFoundException(`ไม่พบประวัติการโอนย้ายรหัส #${id}`);
    }

    return {
      ...transfer,
      fromDeptLabel: DepartmentLabel[transfer.fromDept] || transfer.fromDept,
      toDeptLabel: DepartmentLabel[transfer.toDept] || transfer.toDept,
      asset: transfer.asset ? this.transformAsset(transfer.asset) : null,
    };
  }

  update(id: number, updateAssetTransferDto: UpdateAssetTransferDto) {
    return `This action updates a #${id} assetTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} assetTransfer`;
  }
}
