import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { AssetStatus, MainCategory } from '../asset.enums';
import { Department } from '../../../departments/departments.constants';
import { Type } from 'class-transformer';

export class CreateAssetDto {
  @ApiProperty({ example: 2568, description: 'ปีงบประมาณ' })
  @IsNumber()
  fiscalYear: number;

  @ApiProperty({ example: 'MacBook Pro M3', description: 'ชื่อรายการ' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'url_image.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ enum: MainCategory, example: MainCategory.DURABLE })
  @IsEnum(MainCategory)
  mainCategory: MainCategory;

  @ApiProperty({ example: 'computer' })
  @IsString()
  subCategory: string;

  @ApiProperty({ example: 'โน้ตบุ๊ก' })
  @IsString()
  category: string;

  // --- Details ---
  @ApiPropertyOptional({ example: 'Apple' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ example: 'M3 Pro' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 'SN-APPLE-999' })
  @IsOptional()
  @IsString()
  serial?: string;

  // --- Location ---
  @ApiProperty({ enum: Department, example: Department.ADMIN_SUPPORT, description: 'Code ของหน่วยงาน' })
  @IsEnum(Department)
  department: Department;

  @ApiProperty({ example: 'ห้อง Server' })
  @IsString()
  location: string;

  @ApiPropertyOptional({ example: 'นายสมชาย' })
  @IsOptional()
  @IsString()
  personInCharge?: string;

  @ApiPropertyOptional({ enum: AssetStatus, default: AssetStatus.NORMAL })
  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  // --- Finance ---
  @ApiProperty({ example: 59900 })
  @Type(() => Number)
  @IsNumber()
  value: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  salvageValue?: number;

  @ApiPropertyOptional({ example: 5, description: 'อายุการใช้งาน (ปี)' })
  @IsOptional()
  @IsNumber()
  usefulLife?: number;

  // --- Acquisition ---
  @ApiPropertyOptional({ example: '2024-12-20' })
  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @ApiProperty({ example: '2025-01-15' })
  @IsDateString()
  receiveDate: string;

  @ApiPropertyOptional({ example: 'งบประมาณแผ่นดิน' })
  @IsOptional()
  @IsString()
  budgetSource?: string;

  @ApiPropertyOptional({ example: 'บริษัท A' })
  @IsOptional()
  @IsString()
  vendorName?: string;

  // --- Warranty ---
  @ApiPropertyOptional({ example: '2025-01-15' })
  @IsOptional()
  @IsDateString()
  warrantyStart?: string;

  @ApiPropertyOptional({ example: '2026-01-15' })
  @IsOptional()
  @IsDateString()
  warrantyEnd?: string;

  // --- Specific Fields (Optional ทั้งหมด) ---
  
  // Vehicle
  @ApiPropertyOptional({ description: 'ทะเบียนรถ' })
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ApiPropertyOptional({ description: 'เลขตัวถัง' })
  @IsOptional()
  @IsString()
  chassisNo?: string;

  @ApiPropertyOptional({ description: 'เลขเครื่องยนต์' })
  @IsOptional()
  @IsString()
  engineNo?: string;

  @ApiPropertyOptional({ description: 'cc' })
  @IsOptional()
  @IsNumber()
  cc?: number;

  // Land
  @ApiPropertyOptional({ description: 'เลขโฉนด' })
  @IsOptional()
  @IsString()
  deedNumber?: string;

  @ApiPropertyOptional({ description: 'เลขที่ดิน' })
  @IsOptional()
  @IsString()
  landNumber?: string;

  @ApiPropertyOptional({ description: 'หน้าสำรวจ' })
  @IsOptional()
  @IsString()
  surveyPage?: string;

  @ApiPropertyOptional({ description: 'จำนวนไร่' })
  @IsOptional()
  @IsNumber()
  rai?: number;

  @ApiPropertyOptional({ description: 'จำนวนงาน' })
  @IsOptional()
  @IsNumber()
  ngan?: number;

  @ApiPropertyOptional({ description: 'จำนวนตารางวา' })
  @IsOptional()
  @IsNumber()
  wah?: number;

  // Building
  @ApiPropertyOptional({ description: 'ที่อยู่สิ่งปลูกสร้าง' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'พื้นที่ใช้สอย' })
  @IsOptional()
  @IsNumber()
  areaSize?: number;

  @ApiPropertyOptional({ description: 'ประเภทโครงสร้าง' })
  @IsOptional()
  @IsString()
  structureType?: string;
}