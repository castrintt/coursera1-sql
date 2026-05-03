import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllJobsResponse } from 'src/application/dto/response/job/findAll.response';
import { GetJobByIdResponse } from 'src/application/dto/response/job/getById.response';
import { JobMapper } from 'src/application/mapper/job.mapper';
import { JobEntity } from 'src/domain/entities/job.entity';
import { IJobRepository } from 'src/domain/interfaces/IJobRepository';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { Repository } from 'typeorm';

@Injectable()
export class JobRepository implements IJobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly _job_repository: Repository<JobEntity>,
  ) {}

  async create(job: JobEntity): Promise<{ id: string }> {
    return this._job_repository.save(job).then((saved) => ({ id: saved.id }));
  }

  async findById(id: string): Promise<GetJobByIdResponse> {
    const job = await this._job_repository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!job) {
      throw new NotFoundException(ApiErrorMessages.job.notFoundForId(id));
    }
    return JobMapper.toGetByIdResponse(job);
  }

  async findAllByCategoryId(categoryId: string): Promise<FindAllJobsResponse[]> {
    const jobs = await this._job_repository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
    return jobs.map((job) => JobMapper.toFindAllResponse(job));
  }

  async update(job: Partial<JobEntity> & { id: string }): Promise<boolean> {
    const { id, ...fields } = job;
    return this._job_repository
      .update(id, fields)
      .then((result) => (result.affected ?? 0) > 0);
  }

  async switchCategory(id: string, categoryId: string): Promise<boolean> {
    return this._job_repository
      .update(id, { category: { id: categoryId } })
      .then((result) => (result.affected ?? 0) > 0);
  }

  async delete(id: string): Promise<boolean> {
    return this._job_repository
      .delete(id)
      .then((result) => (result.affected ?? 0) > 0);
  }
}
