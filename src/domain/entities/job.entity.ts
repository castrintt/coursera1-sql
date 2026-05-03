import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('job')
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enterpriseName: string;

  @Column()
  jobTitle: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  candidatedAt: Date;

  @Column({ length: 255, nullable: true })
  jobLink: string;

  @Column({ length: 255, nullable: true })
  observation: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.jobs)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @BeforeInsert()
  onBeforeInsert(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  onBeforeUpdate(): void {
    this.updatedAt = new Date();
  }
}
