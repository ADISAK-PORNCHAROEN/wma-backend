import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { Department } from '../../../departments/departments.constants';

export class CreateAssetTransferDto {
  @ApiProperty({ description: 'ID ของทรัพย์สินที่จะย้าย' })
  @IsString()
  assetId: string;

  @ApiProperty({ enum: Department, description: 'ย้ายไปหน่วยงานไหน' })
  @IsEnum(Department)
  toDept: Department;

  @ApiProperty({ example: '2025-02-20' })
  @IsDateString()
  transferDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  approvedBy?: string;
}