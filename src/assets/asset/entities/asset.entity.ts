import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AssetStatus, MainCategory } from '../asset.enums';
import { Department } from '../../../departments/departments.constants';
import { AssetBorrow } from '../../asset-borrows/entities/asset-borrow.entity';
import { AssetDisposal } from '../../asset-disposals/entities/asset-disposal.entity';
import { AssetRepair } from '../../asset-repairs/entities/asset-repair.entity';
import { AssetTransfer } from '../../asset-transfers/entities/asset-transfer.entity';

@Entity()
export class Asset {
  // --- Identity ---
  @ApiProperty({ example: 'AST-2568-001', description: 'ID ของทรัพย์สิน' })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ example: 2568 })
  @Column()
  fiscalYear: number;

  @ApiProperty({ example: 'คอมพิวเตอร์ตั้งโต๊ะ Dell OptiPlex 7090' })
  @Column()
  name: string;

  @ApiProperty({ example: 'http://example.com/image.jpg', required: false })
  @Column({ nullable: true })
  image: string;

  // --- Classification ---
  @ApiProperty({ enum: MainCategory })
  @Column({ type: 'enum', enum: MainCategory })
  mainCategory: MainCategory;

  @ApiProperty({ example: 'computer' })
  @Column()
  subCategory: string;

  @ApiProperty({ example: 'คอมพิวเตอร์' })
  @Column()
  category: string;

  // --- Details ---
  @ApiProperty({ example: 'Dell', required: false })
  @Column({ nullable: true })
  brand: string;

  @ApiProperty({ example: 'OptiPlex 7090', required: false })
  @Column({ nullable: true })
  model: string;

  @ApiProperty({ example: 'SN-DELL-001', required: false })
  @Column({ nullable: true })
  serial: string;

  // --- Location & Owner ---
  @ApiProperty({ enum: Department, example: Department.CENTRAL })
  @Column({ type: 'text' }) // ใช้ text เพื่อเก็บ Code ภาษาอังกฤษ (ADMIN_SUPPORT)
  department: Department;

  @ApiProperty({ example: 'สำนักงาน ชั้น 3' })
  @Column()
  location: string;

  @ApiProperty({ example: 'สมชาย ใจดี', required: false })
  @Column({ nullable: true })
  personInCharge: string;

  @ApiProperty({ enum: AssetStatus, default: AssetStatus.NORMAL })
  @Column({ type: 'enum', enum: AssetStatus, default: AssetStatus.NORMAL })
  status: AssetStatus;

  // --- Finance ---
  @ApiProperty({ example: 25000 })
  @Column('decimal', { precision: 12, scale: 2 })
  value: number;

  @ApiProperty({ example: 2000, required: false })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  salvageValue: number;

  @ApiProperty({ example: 5, required: false })
  @Column({ nullable: true })
  usefulLife: number;

  // --- Acquisition ---
  @ApiProperty({ example: '2024-12-20', required: false })
  @Column({ type: 'date', nullable: true })
  purchaseDate: string | null;

  @ApiProperty({ example: '2025-01-01' })
  @Column({ type: 'date' })
  receiveDate: string;

  @ApiProperty({ example: 'งบประมาณแผ่นดิน', required: false })
  @Column({ nullable: true })
  budgetSource: string;

  @ApiProperty({ example: 'บริษัท เดลล์ (ประเทศไทย)', required: false })
  @Column({ nullable: true })
  vendorName: string;

  // --- Warranty ---
  @ApiProperty({ example: '2025-01-01', required: false })
  @Column({ type: 'date', nullable: true })
  warrantyStart: string | null;

  @ApiProperty({ example: '2028-01-01', required: false })
  @Column({ type: 'date', nullable: true })
  warrantyEnd: string | null;

  // --- Specific Fields (รวมมิตรทุกประเภท) ---

  // Vehicle
  @ApiProperty({ description: 'ทะเบียนรถ', required: false })
  @Column({ nullable: true }) licensePlate: string;

  @ApiProperty({ description: 'เลขตัวถัง', required: false })
  @Column({ nullable: true }) chassisNo: string;

  @ApiProperty({ description: 'เลขเครื่องยนต์', required: false })
  @Column({ nullable: true }) engineNo: string;

  @ApiProperty({ description: 'ความจุกระบอกสูบ (cc)', required: false })
  @Column({ nullable: true }) cc: number;

  // Land
  @ApiProperty({ description: 'เลขโฉนด', required: false })
  @Column({ nullable: true }) deedNumber: string;

  @ApiProperty({ description: 'เลขที่ดิน', required: false })
  @Column({ nullable: true }) landNumber: string;

  @ApiProperty({ description: 'หน้าสำรวจ', required: false })
  @Column({ nullable: true }) surveyPage: string;

  @ApiProperty({ description: 'ไร่', required: false })
  @Column({ nullable: true }) rai: number;

  @ApiProperty({ description: 'งาน', required: false })
  @Column({ nullable: true }) ngan: number;

  @ApiProperty({ description: 'ตารางวา', required: false })
  @Column('decimal', { precision: 10, scale: 2, nullable: true }) wah: number;

  // Building
  @ApiProperty({ description: 'ที่อยู่สิ่งปลูกสร้าง', required: false })
  @Column({ nullable: true }) address: string;

  @ApiProperty({ description: 'ขนาดพื้นที่ (ตร.ม.)', required: false })
  @Column('decimal', { precision: 10, scale: 2, nullable: true }) areaSize: number;

  @ApiProperty({ description: 'ประเภทโครงสร้าง', required: false })
  @Column({ nullable: true }) structureType: string;

  // --- Relations (ความสัมพันธ์กับ Action Logs) ---

  @OneToMany(() => AssetTransfer, (transfer) => transfer.asset)
  transfers: AssetTransfer[];

  @OneToMany(() => AssetBorrow, (borrow) => borrow.asset)
  borrows: AssetBorrow[];

  @OneToMany(() => AssetRepair, (repair) => repair.asset)
  repairs: AssetRepair[];

  @OneToOne(() => AssetDisposal, (disposal) => disposal.asset)
  disposal: AssetDisposal;

  // --- Timestamps ---
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}