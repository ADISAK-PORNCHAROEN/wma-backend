import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateAssetRepairDto } from './dto/create-asset-repair.dto';
import { UpdateAssetRepairDto } from './dto/update-asset-repair.dto';
import { AssetRepair } from './entities/asset-repair.entity';
import { Asset } from '../asset/entities/asset.entity';
import { AssetStatus } from '../asset/asset.enums';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class AssetRepairsService {
  constructor(
    @InjectRepository(AssetRepair)
    private readonly repairRepo: Repository<AssetRepair>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    private dataSource: DataSource,
    private readonly assetsService: AssetService
  ) {}

  // --- 1. แจ้งซ่อมใหม่ ---
  async create(dto: CreateAssetRepairDto) {
    return await this.dataSource.transaction(async (manager) => {
      const asset = await manager.findOne(Asset, { where: { id: dto.assetId } });
      if (!asset) throw new NotFoundException('ไม่พบทรัพย์สิน');

      const currentYear = new Date().getFullYear() + 543;
      const newId = await this.assetsService.generateSystemId('RP', currentYear);

      // 1. สร้าง Record การซ่อม
      const repair = manager.create(AssetRepair, {
        id: newId,
        ...dto,
        status: 'pending', // เริ่มต้นที่ รอดำเนินการ
      });
      await manager.save(repair);

      // 2. เปลี่ยนสถานะ Asset เป็น "ซ่อมบำรุง"
      asset.status = AssetStatus.MAINTENANCE;
      await manager.save(asset);

      return repair;
    });
  }

  // --- 2. ดูทั้งหมด ---
  async findAll() {
    return this.repairRepo.find({
      relations: ['asset'],
      order: { repairDate: 'DESC' },
    });
  }

  // --- 3. ดูรายตัว ---
  async findOne(id: string) {
    const repair = await this.repairRepo.findOne({
      where: { id },
      relations: ['asset'],
    });
    if (!repair) throw new NotFoundException(`ไม่พบรายการซ่อม ID: ${id}`);
    return repair;
  }

  // --- 4. อัปเดตผลการซ่อม (เช่น ซ่อมเสร็จแล้ว, ลงค่าใช้จ่าย) ---
  async update(id: string, dto: UpdateAssetRepairDto) {
    return await this.dataSource.transaction(async (manager) => {
      // 1. หา Record เดิม
      const repair = await manager.findOne(AssetRepair, { 
        where: { id },
        relations: ['asset']
      });
      if (!repair) throw new NotFoundException('ไม่พบรายการซ่อม');

      // 2. อัปเดตข้อมูลในตารางซ่อม
      manager.merge(AssetRepair, repair, dto);
      await manager.save(repair);

      // 3. Logic พิเศษ: ถ้าสถานะเปลี่ยนเป็น "completed" (ซ่อมเสร็จ)
      // ให้เปลี่ยนสถานะ Asset กลับเป็น "ปกติ"
      if (dto.status === 'completed') {
        const asset = repair.asset;
        asset.status = AssetStatus.NORMAL; // กลับมาพร้อมใช้งาน
        await manager.save(asset);
      }

      return repair;
    });
  }

  // --- 5. ลบรายการ (ถ้าจำเป็น) ---
  async remove(id: string) {
    const result = await this.repairRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('ไม่พบรายการซ่อม');
    return { message: 'ลบรายการสำเร็จ' };
  }
}