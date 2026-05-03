import { Inject, NotFoundException } from '@nestjs/common';
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
    const job = await this._job_repository.findJobEntityById(command.id);
    if (!job || job.category.user.id !== command.requestingUserId) {
      throw new NotFoundException();
    }
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
