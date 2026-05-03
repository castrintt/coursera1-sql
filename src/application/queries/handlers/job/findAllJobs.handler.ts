import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllJobsResponse } from 'src/application/dto/response/job/findAll.response';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { type IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { CategoryRepositorySymbol, JobRepositorySymbol } from 'src/modules/symbols/symbols';
import { FindAllJobsQuery } from '../../job.query';

@QueryHandler(FindAllJobsQuery)
export class FindAllJobsHandler implements IQueryHandler<FindAllJobsQuery> {
  constructor(
    @Inject(JobRepositorySymbol)
    private readonly _job_repository: IJobRepository,
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(query: FindAllJobsQuery): Promise<FindAllJobsResponse[]> {
    const category = await this._category_repository.findById(query.categoryId);
    if (!category || category.user.id !== query.requestingUserId) {
      throw new NotFoundException();
    }
    return this._job_repository.findAllByCategoryId(query.categoryId);
  }
}
