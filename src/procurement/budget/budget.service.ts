import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';

// เพื่อให้ NestJS ส่ง Repository ของตาราง Budget มาให้
@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}
  // สร้างรหัสโครงการ (projectCode) อัตโนมัติ
  private async generateProjectCode(fiscalYear: number): Promise<string> {
    const yearSuffix = String(fiscalYear).slice(-2); // 2568 → 68
    // หาลำดับล่าสุดของปีนั้น
    const lastBudget = await this.budgetRepository.findOne({
      where: { fiscalYear },
      order: { id: 'DESC' },
    });

    let sequence = 1;
    if (lastBudget?.projectCode) {
      const lastSequence = parseInt(lastBudget.projectCode.split('-')[2], 10);
      sequence = lastSequence + 1;
    }

    // BUD-68-001, BUD-68-002, ...
    return `BUD-${yearSuffix}-${String(sequence).padStart(3, '0')}`;
  }
    
  // สร้างงบประมาณใหม่
  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
     // Auto projectCode 
      const projectCode = await this.generateProjectCode(createBudgetDto.fiscalYear);

      const budget = this.budgetRepository.create({
        ...createBudgetDto,
        projectCode,
      });
      return this.budgetRepository.save(budget);
  }

   // อัปเดตงบประมาณ
  async update(id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepository.findOneBy({ id });
    if (!budget) {
      throw new Error('Budget not found');
    }
    Object.assign(budget, updateBudgetDto);
    return this.budgetRepository.save(budget);
  }

   // ลบงบประมาณ
  async remove(id: number): Promise<void> {
    const budget = await this.budgetRepository.findOneBy({ id });
    if (!budget) {
      throw new Error('Budget not found');
    }
    await this.budgetRepository.remove(budget);
  }

   // ดึงข้อมูลงบประมาณทั้งหมด
  async findAll(): Promise<Budget[]> {
    return await this.budgetRepository.find({
      order: { id: 'DESC' },
    });
  }

   // ดึงข้อมูลงบประมาณตาม ID
  async findOne(id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOneBy({ id });
    if (!budget) {
      throw new Error('Budget not found');
    }
    return budget;
  }
}
