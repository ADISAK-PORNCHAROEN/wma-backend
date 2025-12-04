import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Asset } from '../../asset/entities/asset.entity';

@Entity()
export class AssetDisposal {
  @PrimaryColumn()
  id: string;

  // จำหน่ายทำแค่ครั้งเดียวต่อ 1 Asset เลยใช้ OneToOne
  @OneToOne(() => Asset, (asset) => asset.disposal, { onDelete: 'CASCADE' })
  @JoinColumn()
  asset: Asset;

  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @Column()
  assetId: string;

  @ApiProperty({ example: 'ขายทอดตลาด', enum: ['ชำรุด', 'เสื่อมสภาพ', 'ขายออก', 'บริจาค', 'สูญหาย'] })
  @Column()
  reason: string;

  @ApiProperty({ example: '2025-02-01' })
  @Column({ type: 'date' })
  disposalDate: string;

  @ApiProperty({ example: 4500, required: false })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  salePrice: number;

  @ApiProperty({ example: 'คณะกรรมการบริหาร', required: false })
  @Column({ nullable: true })
  approvedBy: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
}