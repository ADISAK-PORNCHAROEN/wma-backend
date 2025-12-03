import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('budgets')
export class Budget {
      @PrimaryGeneratedColumn()
      id: number;  // รหัสงบประมาณ (Primary Key)
      @Column()
      fiscalYear: number; // ปีงบประมาณ
      @Column()
      projectCode: string; // รหัสงบประมาณ 
      @Column()
      projectName: string; // ชื่อโครงการ / รายการงบประมาณ
      @Column()
      budgetType: string;   // ประเภทงบประมาณ
      @Column()
      department: string;  // หน่วยงานเจ้าของงบ
      @Column({ type: 'decimal', precision: 15, scale: 2 }) // precision: 15 → จำนวนตัวเลขทั้งหมด, scale: 2 → จำนวนทศนิยม
      amount: number;  // วงเงินงบประมาณที่ได้รับจัดสรร (บาท) 
      @Column() 
      startDate: Date;  // วันที่เริ่มใช้งบ
      @Column()
      endDate: Date;  // วันที่สิ้นสุดใช้งบ
      @Column()
      description: string;  //รายละเอียดเพิ่มเติม / หมายเหตุ
}
