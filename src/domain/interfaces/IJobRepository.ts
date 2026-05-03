import { JobEntity } from 'src/domain/entities/job.entity';
import { GetJobByIdResponse } from 'src/application/dto/response/job/getById.response';
import { FindAllJobsResponse } from 'src/application/dto/response/job/findAll.response';

export interface IJobRepository {
  create(job: JobEntity): Promise<{ id: string }>;
  findById(id: string): Promise<GetJobByIdResponse>;
  findJobEntityById(id: string): Promise<JobEntity | null>;
  findAllByCategoryId(categoryId: string): Promise<FindAllJobsResponse[]>;
  update(job: Partial<JobEntity> & { id: string }): Promise<boolean>;
  switchCategory(id: string, categoryId: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
