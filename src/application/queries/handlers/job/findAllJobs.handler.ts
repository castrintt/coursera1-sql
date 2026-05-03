import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllJobsResponse } from 'src/application/dto/response/job/findAll.response';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { FindAllJobsQuery } from '../../job.query';

@QueryHandler(FindAllJobsQuery)
export class FindAllJobsHandler implements IQueryHandler<FindAllJobsQuery> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
  ) {}

  async execute(query: FindAllJobsQuery): Promise<FindAllJobsResponse[]> {
    return this._job_repository.findAllByCategoryId(query.categoryId);
  }
}
