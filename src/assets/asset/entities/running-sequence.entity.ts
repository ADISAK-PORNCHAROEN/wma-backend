import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class RunningSequence {
  @PrimaryColumn()
  groupCode: string; 

  @Column({ default: 0 })
  currentSequence: number; 

  @UpdateDateColumn()
  lastUpdated: Date;
}