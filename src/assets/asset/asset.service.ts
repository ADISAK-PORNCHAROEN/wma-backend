import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { MainCategory } from './asset.enums';
import { RunningSequence } from './entities/running-sequence.entity';
import { DepartmentLabel } from '../../departments/departments.constants';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    private readonly dataSource: DataSource,
  ) {}

  private transformAsset(asset: Asset) {
    return {
      ...asset,
      departmentLabel: DepartmentLabel[asset.department] || asset.department
    };
  }

  public async generateSystemId(
    type: 'ASSET' | 'TR' | 'BR' | 'RP' | 'DS', 
    fiscalYear: number, 
    category?: MainCategory
  ): Promise<string> {
    
    let groupCode = '';

    // 1. กำหนดรูปแบบ Prefix
    if (type === 'ASSET') {
      switch (category) {
        case MainCategory.DURABLE:
          groupCode = `AST-${fiscalYear}`;
          break;
        case MainCategory.LAND:
          groupCode = 'AST-LND';
          break;
        case MainCategory.BUILDING:
          groupCode = 'AST-BLD';
          break;
        case MainCategory.INTANGIBLE:
          groupCode = 'AST-SFT';
          break;
        default:
          groupCode = `AST-${fiscalYear}`;
      }
    } else {
      groupCode = `${type}-${fiscalYear}`;
    }

    // 2. รันเลขใน Database (Transaction)
    return await this.dataSource.transaction(async (manager) => {
      let seq = await manager.findOne(RunningSequence, {
        where: { groupCode },
        lock: { mode: 'pessimistic_write' }
      });

      if (!seq) {
        seq = manager.create(RunningSequence, {
          groupCode,
          currentSequence: 0
        });
      }
      
      seq.currentSequence += 1;
      await manager.save(seq);

      const runNumber = seq.currentSequence.toString().padStart(3, '0');
      
      return `${groupCode}-${runNumber}`;
    });
  }

  // --- 1. สร้างทรัพย์สินใหม่ (Create) ---
  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const newId = await this.generateSystemId(
      'ASSET',
      createAssetDto.fiscalYear,
      createAssetDto.mainCategory, 
    );

    // 2. บันทึก Asset
    const asset = this.assetsRepository.create({
      ...createAssetDto,
      id: newId, 
    });

    return await this.assetsRepository.save(asset);
  }

  // --- 2. ดึงข้อมูลทั้งหมด (Read All) ---
  async findAll(): Promise<Asset[]> {
    const assets = await this.assetsRepository.find({
      order: {
        createdAt: 'DESC', 
      },
      // relations: [], 
    });

    return assets.map(asset => this.transformAsset(asset));
  }

  // --- 3. ดึงข้อมูลรายตัว (Read One) ---
  async findOne(id: string): Promise<Asset> {
    const asset = await this.assetsRepository.findOne({
      where: { id },
      // relations: [], // ใส่ relations ถ้าต้องการดึงประวัติการซ่อม/ยืมด้วย
    });

    if (!asset) {
      throw new NotFoundException(`ไม่พบทรัพย์สินที่มี ID: ${id}`);
    }

    return this.transformAsset(asset);
  }

  // --- 4. แก้ไขข้อมูล (Update) ---
  async update(id: string, updateAssetDto: UpdateAssetDto): Promise<Asset> {

    const existingAsset = await this.findOne(id);
    const updatedAsset = this.assetsRepository.merge(existingAsset, updateAssetDto);

    return await this.assetsRepository.save(updatedAsset);
  }

  // --- 5. ลบข้อมูล (Delete) ---
  async remove(id: string): Promise<void> {
    const result = await this.assetsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`ไม่สามารถลบได้ เนื่องจากไม่พบทรัพย์สิน ID: ${id}`);
    }
  }
}