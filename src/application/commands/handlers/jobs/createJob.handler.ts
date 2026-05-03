import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobEntity } from 'src/domain/entities/job.entity';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { CreateJobCommand } from '../../job.commands';

@CommandHandler(CreateJobCommand)
export class CreateJobHandler implements ICommandHandler<CreateJobCommand> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
  ) {}

  async execute(command: CreateJobCommand): Promise<{ id: string }> {
    const job = new JobEntity();
    job.enterpriseName = command.enterpriseName;
    job.jobTitle = command.jobTitle;
    job.candidatedAt = command.candidatedAt;
    job.jobLink = command.jobLink;
    job.observation = command.observation;
    job.category = { id: command.categoryId } as any;

    return this._job_repository.create(job);
  }
}
