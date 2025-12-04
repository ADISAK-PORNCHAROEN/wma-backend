import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsDateString, IsOptional, IsEnum } from 'class-validator';

export class CreateAssetRepairDto {
  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @IsString()
  assetId: string;

  @ApiProperty({ description: 'อาการเสีย' })
  @IsString()
  issue: string;

  @ApiProperty({ description: 'ผู้แจ้งซ่อม' })
  @IsString()
  requester: string;

  @ApiProperty({ example: '2025-02-20' })
  @IsDateString()
  repairDate: string;

  @ApiPropertyOptional({ enum: ['pending', 'in_progress', 'completed'], description: 'สถานะการซ่อม' })
  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}