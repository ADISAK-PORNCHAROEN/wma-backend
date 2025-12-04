import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class ReturnAssetDto {
  @ApiProperty({ description: 'ชื่อผู้รับคืน / ผู้ดำเนินการ' })
  @IsString()
  @IsNotEmpty()
  returnerName: string;

  @ApiProperty({ example: '2025-02-25', description: 'วันที่รับคืน' })
  @IsDateString()
  returnDate: string;

}