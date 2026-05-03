import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { DeleteJobCommand } from '../../job.commands';

@CommandHandler(DeleteJobCommand)
export class DeleteJobHandler implements ICommandHandler<DeleteJobCommand> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
  ) {}

  async execute(command: DeleteJobCommand): Promise<boolean> {
    const job = await this._job_repository.findJobEntityById(command.id);
    if (!job || job.category.user.id !== command.requestingUserId) {
      throw new NotFoundException();
    }
    return this._job_repository.delete(command.id);
  }
}
