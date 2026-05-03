import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import {
  CategoryRepositorySymbol,
} from 'src/modules/symbols/symbols';
import { CreateCategoryCommand } from '../../category.commands';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<boolean> {
    const order =
      command.order !== undefined
        ? command.order
        : await this._category_repository.getNextOrderForUser(
            command.requestingUserId,
          );

    const entity = new CategoryEntity();
    entity.name = command.name;
    entity.order = order;
    entity.user = { id: command.requestingUserId } as UserEntity;
    await this._category_repository.save(entity);
    return true;
  }
}
