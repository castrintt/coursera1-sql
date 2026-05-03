import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { CategoryRepositorySymbol } from 'src/modules/symbols/symbols';
import { DeleteCategoryCommand } from '../../category.commands';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(command: DeleteCategoryCommand): Promise<boolean> {
    const category = await this._category_repository.findById(command.id);
    if (!category || category.user.id !== command.requestingUserId) {
      throw new NotFoundException();
    }
    return this._category_repository.remove(command.id);
  }
}
