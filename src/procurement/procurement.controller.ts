import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProcurementService } from './procurement.service';
import { CreateProcurementDto } from './dto/create-procurement.dto';
import { UpdateProcurementDto } from './dto/update-procurement.dto';

@ApiTags('procurement')
@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Post()
  @ApiOperation({ summary: 'สร้าง procurement ใหม่' })
  create(@Body() createProcurementDto: CreateProcurementDto) {
    return this.procurementService.create(createProcurementDto);
  }

  @Get()
  @ApiOperation({ summary: 'ดึงรายการ procurement ทั้งหมด' })
  findAll() {
    return this.procurementService.findAll();
  }

  // ใช้ ParseIntPipe เพื่อให้ "budget" ไม่ถูกจับเป็น :id (จะ error 400 แทน)
  @Get(':id')
  @ApiOperation({ summary: 'ดึง procurement ตาม ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.procurementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไข procurement' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcurementDto: UpdateProcurementDto,
  ) {
    return this.procurementService.update(id, updateProcurementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบ procurement' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.procurementService.remove(id);
  }
}
