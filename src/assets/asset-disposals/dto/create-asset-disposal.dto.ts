import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateAssetDisposalDto {
  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @IsString()
  assetId: string;

  @ApiProperty({ example: 'ขายทอดตลาด', description: 'เหตุผล (ชำรุด, เสื่อมสภาพ, ขายออก, สูญหาย)' })
  @IsString()
  reason: string;

  @ApiProperty({ example: '2025-02-20' })
  @IsDateString()
  disposalDate: string;

  @ApiPropertyOptional({ description: 'ราคาขาย (ถ้ามี)' })
  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  approvedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}