import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { CategoryRepositorySymbol } from "src/IoC/symbols/category.symbols";
import { Repository } from "typeorm";


@Injectable()
export class CategoryRepository implements ICategoryRepository {

    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: Repository<CategoryEntity>,
    ) { }

}

