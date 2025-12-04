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
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@ApiTags('procurement/budget')
@Controller('procurement/budget')  // ← กำหนด path เต็ม
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiOperation({ summary: 'สร้างงบประมาณใหม่' })
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  @ApiOperation({ summary: 'ดึงรายการงบประมาณทั้งหมด' })
  findAll() {
    return this.budgetService.findAll();  // ← ต้องเรียก findAll() ไม่ใช่ return string
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงงบประมาณตาม ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.budgetService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขงบประมาณ' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบงบประมาณ' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.budgetService.remove(id);
  }
}