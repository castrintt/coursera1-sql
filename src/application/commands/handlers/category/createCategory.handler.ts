import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { type ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { CreateCategoryCommand } from "../../category.commands";
import { CategoryRepositorySymbol, UserRepositorySymbol } from "src/modules/symbols/symbols";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { UserEntity } from "src/domain/entities/user.entity";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: ICategoryRepository,
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: CreateCategoryCommand): Promise<boolean> {
        await this._user_repository.findById(command.userId);
        const order = command.order !== undefined
            ? command.order
            : await this._category_repository.getNextOrderForUser(command.userId);
        const entity = new CategoryEntity();
        entity.name = command.name;
        entity.order = order;
        entity.user = { id: command.userId } as UserEntity;
        await this._category_repository.save(entity);
        return true;
    }

}
