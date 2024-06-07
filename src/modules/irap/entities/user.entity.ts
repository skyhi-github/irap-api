import {
    BaseEntity,
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity('user')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Index()
    @Column({ type: 'varchar', name: 'employee_id', length: 10, nullable: true })
    employee_id: string;

    @Index()
    @Column({ type: 'varchar', name: 'first_name', length: 10, nullable: true })
    first_name: string;

    @Index()
    @Column({ type: 'varchar', name: 'last_name', length: 10, nullable: true })
    last_name: string;

    @Index()
    @Column({ type: 'varchar', name: 'email', length: 35, nullable: true })
    email: string;

    @Index()
    @Column({ type: 'varchar', name: 'password', length: 255, nullable: true })
    password: string;

  }