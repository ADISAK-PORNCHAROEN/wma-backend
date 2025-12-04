import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Asset } from '../../asset/entities/asset.entity';
import { Department } from '../../../departments/departments.constants';


@Entity()
export class AssetTransfer {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Asset, (asset) => asset.transfers, { onDelete: 'CASCADE' })
  asset: Asset;

  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @Column()
  assetId: string; // เก็บ ID แยกไว้เพื่อให้ Query ง่ายขึ้นโดยไม่ต้อง Join

  @ApiProperty({ enum: Department, description: 'ย้ายจากหน่วยงาน' })
  @Column({ type: 'text' }) // ใช้ text เพื่อเก็บ Code ภาษาอังกฤษ
  fromDept: Department;

  @ApiProperty({ enum: Department, description: 'ย้ายไปหน่วยงาน' })
  @Column({ type: 'text' })
  toDept: Department;

  @ApiProperty({ example: '2025-02-12' })
  @Column({ type: 'date' })
  transferDate: string;

  @ApiProperty({ example: 'ย้ายตามผังองค์กรใหม่', required: false })
  @Column({ nullable: true })
  note: string;

  @ApiProperty({ example: 'หัวหน้าฝ่ายบุคคล', required: false })
  @Column({ nullable: true })
  approvedBy: string;

  @CreateDateColumn()
  createdAt: Date;
}