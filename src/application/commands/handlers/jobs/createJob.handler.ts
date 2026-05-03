import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobEntity } from 'src/domain/entities/job.entity';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { CategoryRepositorySymbol, JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { CreateJobCommand } from '../../job.commands';

@CommandHandler(CreateJobCommand)
export class CreateJobHandler implements ICommandHandler<CreateJobCommand> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(command: CreateJobCommand): Promise<{ id: string }> {
    const category = await this._category_repository.findById(
      command.categoryId,
    );
    if (!category || category.user.id !== command.requestingUserId) {
      throw new NotFoundException();
    }

    const job = new JobEntity();
    job.enterpriseName = command.enterpriseName;
    job.jobTitle = command.jobTitle;
    job.candidatedAt = command.candidatedAt;
    job.jobLink = command.jobLink;
    job.observation = command.observation;
    job.category = category;

    return this._job_repository.create(job);
  }
}
