import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateAssetBorrowDto } from './dto/create-asset-borrow.dto';
import { AssetBorrow } from './entities/asset-borrow.entity';
import { Asset } from '../asset/entities/asset.entity';
import { AssetStatus } from '../asset/asset.enums';
import { UpdateAssetBorrowDto } from './dto/update-asset-borrow.dto';
import { AssetService } from '../asset/asset.service';
import { ReturnAssetDto } from './dto/return-asset.dto';

@Injectable()
export class AssetBorrowsService {
  constructor(
    @InjectRepository(AssetBorrow)
    private readonly borrowRepo: Repository<AssetBorrow>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    private dataSource: DataSource,
    private readonly assetsService: AssetService,
  ) {}

  // --- ยืมของ (Create) ---
  create(dto: CreateAssetBorrowDto) {
    return this.dataSource.transaction(async (manager) => {
      const asset = await manager.findOne(Asset, { where: { id: dto.assetId } });
      if (!asset) throw new NotFoundException('ไม่พบทรัพย์สิน');

      // เช็คว่าของว่างไหม
      if (asset.status !== AssetStatus.NORMAL) {
        throw new BadRequestException(`ทรัพย์สินไม่อยู่ในสถานะพร้อมยืม (สถานะปัจจุบัน: ${asset.status})`);
      }

      const currentYear = new Date().getFullYear() + 543;
      const newId = await this.assetsService.generateSystemId('BR', currentYear);

      // 1. สร้างประวัติยืม
      const borrow = manager.create(AssetBorrow, {
        id: newId,
        ...dto,
        status: 'borrowing',
      });
      await manager.save(borrow);

      // 2. อัปเดตสถานะ Asset
      asset.status = AssetStatus.BORROWED;
      await manager.save(asset);

      return borrow;
    });
  }

  // --- คืนของ (Return) - เพิ่มฟังก์ชันนี้พิเศษ ---
  returnAsset(id: string, dto: ReturnAssetDto) {
    return this.dataSource.transaction(async (manager) => {
      // ค้นหาประวัติการยืมของ Asset นี้ ที่สถานะยังเป็น borrowing
      const borrowRecord = await manager.findOne(AssetBorrow, { 
        where: { 
            assetId: id,
            status: 'borrowing' 
        },
        relations: ['asset']
      });

      if (!borrowRecord) throw new NotFoundException('ไม่พบข้อมูลการยืม หรือรายการนี้ถูกคืนไปแล้ว');

      // 1. อัปเดตข้อมูลการคืนจาก DTO
      borrowRecord.returnDate = dto.returnDate; // ใช้วันที่จากที่ User เลือก
      borrowRecord.returner = dto.returnerName; // บันทึกผู้รับคืน
      borrowRecord.status = 'returned';
      
      await manager.save(borrowRecord);

      // 2. อัปเดต Asset กลับเป็นปกติ
      const asset = borrowRecord.asset;
      asset.status = AssetStatus.NORMAL;
      await manager.save(asset);

      return borrowRecord;
    });
  }

  findAll() {
    return this.borrowRepo.find({ relations: ['asset'], order: { borrowDate: 'DESC' } });
  }

  findOne(id: string) {
    return this.borrowRepo.findOne({where: {id}, relations: ['asset'], order: { borrowDate: 'DESC' }});
  }

  update(id: number, updateAssetBorrowDto: UpdateAssetBorrowDto) {
    return `This action updates a #${id} assetBorrow`;
  }

  remove(id: number) {
    return `This action removes a #${id} assetBorrow`;
  }
}
