import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 150 })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @BeforeInsert()
  async onBeforeInsert(): Promise<void> {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.password = await bcrypt.hash(this.password, 12);
  }

  @BeforeUpdate()
  onBeforeUpdate(): void {
    this.updatedAt = new Date();
  }
}
