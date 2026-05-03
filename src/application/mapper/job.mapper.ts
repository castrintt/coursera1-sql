import { FindAllJobsResponse } from 'src/application/dto/response/job/findAll.response';
import { GetJobByIdResponse } from 'src/application/dto/response/job/getById.response';
import { JobEntity } from 'src/domain/entities/job.entity';

export class JobMapper {
  static toGetByIdResponse(job: JobEntity): GetJobByIdResponse {
    return new GetJobByIdResponse(
      job.id,
      job.enterpriseName,
      job.jobTitle,
      job.candidatedAt,
      job.jobLink,
      job.observation,
    );
  }

  static toFindAllResponse(job: JobEntity): FindAllJobsResponse {
    return new FindAllJobsResponse(
      job.id,
      job.enterpriseName,
      job.jobTitle,
      job.candidatedAt,
      job.jobLink,
      job.observation,
      job.category?.id ?? '',
    );
  }
}
