import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { CategoryRepositorySymbol, JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { SwitchJobCategoryCommand } from '../../job.commands';

@CommandHandler(SwitchJobCategoryCommand)
export class SwitchJobCategoryHandler
  implements ICommandHandler<SwitchJobCategoryCommand>
{
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(command: SwitchJobCategoryCommand): Promise<boolean> {
    const [job, targetCategory] = await Promise.all([
      this._job_repository.findJobEntityById(command.id),
      this._category_repository.findById(command.categoryId),
    ]);

    if (!job || job.category.user.id !== command.requestingUserId) {
      throw new NotFoundException();
    }
    if (!targetCategory || targetCategory.user.id !== command.requestingUserId) {
      throw new NotFoundException();
    }

    return this._job_repository.switchCategory(command.id, command.categoryId);
  }
}
