import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJobByIdResponse } from 'src/application/dto/response/job/getById.response';
import { JobMapper } from 'src/application/mapper/job.mapper';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { GetJobByIdQuery } from '../../job.query';

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
  ) {}

  async execute(query: GetJobByIdQuery): Promise<GetJobByIdResponse> {
    const job = await this._job_repository.findJobEntityById(query.id);
    if (!job || job.category.user.id !== query.requestingUserId) {
      throw new NotFoundException();
    }
    return JobMapper.toGetByIdResponse(job);
  }
}
