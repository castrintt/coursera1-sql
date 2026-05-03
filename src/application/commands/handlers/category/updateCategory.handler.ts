import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { CategoryRepositorySymbol } from 'src/modules/symbols/symbols';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { UpdateCategoryCommand } from '../../category.commands';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  constructor(
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<boolean> {
    const category = await this._category_repository.findById(command.id);
    if (!category) {
      throw new NotFoundException(
        ApiErrorMessages.category.notFoundForId(command.id),
      );
    }
    category.name = command.name;
    if (command.order !== undefined) {
      category.order = command.order;
    }
    await this._category_repository.save(category);
    return true;
  }
}
