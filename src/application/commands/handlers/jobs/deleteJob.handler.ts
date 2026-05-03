import { Inject } from '@nestjs/common';
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
    return this._job_repository.delete(command.id);
  }
}
