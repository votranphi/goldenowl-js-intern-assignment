import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  sbd: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  toan: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  ngu_van: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  ngoai_ngu: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  vat_li: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  hoa_hoc: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  sinh_hoc: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  lich_su: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  dia_li: number | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  gdcd: number | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  ma_ngoai_ngu: string | null;

  @CreateDateColumn()
  created_at: Date;
}