import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  findByUserIdOrdered(userId: string): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | null>;
  getNextOrderForUser(userId: string): Promise<number>;
  save(entity: CategoryEntity): Promise<CategoryEntity>;
  remove(id: string): Promise<boolean>;
}
