import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateAssetBorrowDto {
  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @IsString()
  assetId: string;

  @ApiProperty({ description: 'ชื่อผู้ยืม' })
  @IsString()
  borrower: string;

  @ApiProperty({ example: '2025-02-20' })
  @IsDateString()
  borrowDate: string;

  @ApiPropertyOptional({ example: '2025-02-25' })
  @IsOptional()
  @IsDateString()
  expectedReturnDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

}