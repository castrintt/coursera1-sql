import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CategoryRepositorySymbol } from "src/IoC/symbols/category.symbols";
import { UserRepositorySymbol } from "src/IoC/symbols/user.symbols";
import { type ICategoryRepository } from "src/domain/interfaces/ICategoryRepository";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { CreateCategoryCommand } from "../../category.commands";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(
        @Inject(CategoryRepositorySymbol)
        private readonly _category_repository: ICategoryRepository,
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(command: CreateCategoryCommand): Promise<boolean> {
        return true
    }

}