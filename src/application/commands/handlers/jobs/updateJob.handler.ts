import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { UpdateJobCommand } from '../../job.commands';

@CommandHandler(UpdateJobCommand)
export class UpdateJobHandler implements ICommandHandler<UpdateJobCommand> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
  ) {}

  async execute(command: UpdateJobCommand): Promise<boolean> {
    return this._job_repository.update({
      id: command.id,
      enterpriseName: command.enterpriseName,
      jobTitle: command.jobTitle,
      candidatedAt: command.candidatedAt,
      jobLink: command.jobLink,
      observation: command.observation,
    });
  }
}
