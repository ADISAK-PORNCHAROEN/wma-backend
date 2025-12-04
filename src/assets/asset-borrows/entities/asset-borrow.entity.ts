import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Asset } from '../../asset/entities/asset.entity';

@Entity()
export class AssetBorrow {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Asset, (asset) => asset.borrows, { onDelete: 'CASCADE' })
  asset: Asset;

  @ApiProperty({ description: 'ID ของทรัพย์สิน' })
  @Column()
  assetId: string;

  @ApiProperty({ example: 'นาย ก.', description: 'ชื่อผู้ยืม' })
  @Column()
  borrower: string;

  @ApiProperty({ example: '2025-02-10' })
  @Column({ type: 'date' })
  borrowDate: string;

  @ApiProperty({ example: '2025-02-20', required: false })
  @Column({ type: 'date', nullable: true })
  expectedReturnDate: string;

  @ApiProperty({ example: '2025-02-19', description: 'วันที่คืนจริง (ถ้ามีค่าแสดงว่าคืนแล้ว)', required: false })
  @Column({ type: 'date', nullable: true })
  returnDate: string;

  @ApiProperty({ example: 'borrowing', enum: ['borrowing', 'returned'] })
  @Column({ default: 'borrowing' }) 
  status: string;

  @ApiProperty({ example: 'ยืมไปออกบูธ', required: false })
  @Column({ nullable: true })
  note: string;

  @ApiProperty({ example: 'Admin A', description: 'ชื่อผู้รับคืน/ผู้ดำเนินการ', required: false })
  @Column({ nullable: true })
  returner: string; // ผู้รับคืน

  @CreateDateColumn()
  createdAt: Date;
}