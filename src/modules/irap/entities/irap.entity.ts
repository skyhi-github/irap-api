import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('irap')
export class IRAP extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', name: 'mo', length: 25, nullable: true })
  mo: string;

  @Index()
  @Column({ type: 'varchar', name: 'cpo', length: 25, nullable: true })
  cpo: string;

  @Index()
  @Column({ type: 'varchar', name: 'working_no', length: 25, nullable: true })
  working_no: string;

  @Index()
  @Column({ type: 'varchar', name: 'article', length: 25, nullable: true })
  article: string;

  @Index()
  @Column({ type: 'varchar', name: 'country', length: 25, nullable: true })
  country: string;

  @Index()
  @Column({ type: 'decimal', name: 'mo_order_qty', nullable: true })
  mo_order_qty: number

  @Index()
  @Column({ type: 'decimal', name: 'sample_size', nullable: true })
  sample_size: number

  @Index()
  @Column({ type: 'date', name: 'tc_podd', nullable: true })
  tc_podd: Date

  @Index()
  @Column({ type: 'boolean', name: 'inspect_result', nullable: true, })
  inspect_result: boolean

  @Index()
  @Column({ type: 'varchar', name: 'inspect_from', length: 25, nullable: true })
  inspect_from: string

  @Index()
  @Column({ type: 'varchar', name: 'inspector_name', length: 25, nullable: true })
  inspector_name: string

  @Index()
  @Column({ type: 'varchar', name: 'person_in_charge', length: 25, nullable: true })
  person_in_charge: string

  @Index()
  @Column({ type: 'varchar', name: 'department', length: 25, nullable: true })
  department: string

  @Index()
  @Column({ type: 'date', name: 'inspect_date', nullable: true })
  inspect_date: Date

  @Index()
  @Column({ type: 'varchar', name: 'issue', length: 255, nullable: true })
  issue: string;

  @Column('text', {nullable: true})
  root_cause: string;

  @Column('text', {nullable: true})
  action: string;

  @Column('text', {nullable: true})
  prevention: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  created_at!: Date;

  @Index()
  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updated_At: Date ;

}
