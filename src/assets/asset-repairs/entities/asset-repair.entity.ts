import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Asset } from '../../asset/entities/asset.entity';

@Entity()
export class AssetRepair {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Asset, (asset) => asset.repairs, { onDelete: 'CASCADE' })
  asset: Asset;

  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @Column()
  assetId: string;

  @ApiProperty({ example: 'เปิดไม่ติด' })
  @Column()
  issue: string;

  @ApiProperty({ example: 'นายสมชาย (ไอที)' })
  @Column()
  requester: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'in_progress', 'completed'] })
  @Column({ default: 'pending' })
  status: string;

  @ApiProperty({ example: '2025-02-18' })
  @Column({ type: 'date' })
  repairDate: string;

  @ApiProperty({ example: 5000, required: false })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost: number;

  @ApiProperty({ example: 'รออะไหล่จากศูนย์', required: false })
  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
}