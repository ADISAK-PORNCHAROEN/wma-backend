import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBudgetDto {
  @ApiProperty({
    description: 'ปีงบประมาณ',
    example: 2568,
  })
  @IsNumber()
  @IsNotEmpty()
  fiscalYear: number;

  @ApiProperty({
    description: 'ชื่อโครงการ / รายการงบประมาณ',
    example: 'ค่าครุภัณฑ์คอมพิวเตอร์ ประจำปี 2568',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  projectName: string;

  @ApiProperty({
    description: 'ประเภทงบประมาณ',
    example: 'CAPEX',
    enum: ['CAPEX', 'OPEX', 'OTHER'],
  })
  @IsString()
  @IsNotEmpty()
  budgetType: string;

  @ApiProperty({
    description: 'หน่วยงานเจ้าของงบ',
    example: 'กองเทคโนโลยีสารสนเทศ',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    description: 'วงเงินงบประมาณ (บาท)',
    example: 500000.00,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'วันที่เริ่มใช้งบ (YYYY-MM-DD)',
    example: '2024-10-01',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'วันที่สิ้นสุดใช้งบ (YYYY-MM-DD)',
    example: '2025-09-30',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({
    description: 'รายละเอียดเพิ่มเติม / หมายเหตุ',
    example: 'งบประมาณสำหรับจัดซื้อคอมพิวเตอร์ใหม่',
  })
  @IsString()
  @IsOptional()
  description?: string;
}