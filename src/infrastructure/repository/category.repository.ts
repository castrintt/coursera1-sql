import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { Repository } from "typeorm";


@Injectable()
export class CategoryRepository implements ICategoryRepository {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly _category_repository: Repository<CategoryEntity>,
    ) { }

    async findByUserIdOrdered(userId: string): Promise<CategoryEntity[]> {
        return this._category_repository.find({
            where: { user: { id: userId } },
            relations: ["jobs"],
            order: { order: "ASC" },
        });
    }

    async findById(id: string): Promise<CategoryEntity | null> {
        return this._category_repository.findOne({ where: { id } });
    }

    async getNextOrderForUser(userId: string): Promise<number> {
        const raw = await this._category_repository
            .createQueryBuilder("c")
            .select("COALESCE(MAX(c.order), -1)", "max")
            .where("c.userId = :userId", { userId })
            .getRawOne<{ max: string | number }>();
        const max = Number(raw?.max);
        return (Number.isNaN(max) ? -1 : max) + 1;
    }

    async save(entity: CategoryEntity): Promise<CategoryEntity> {
        return this._category_repository.save(entity);
    }

    async remove(id: string): Promise<boolean> {
        const result = await this._category_repository.delete(id);
        return (result.affected ?? 0) > 0;
    }

}
