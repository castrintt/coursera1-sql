import {
  CategoryJobListItemResponse,
  FindAllCategoriesResponse,
} from 'src/application/dto/response/category/findAll.response';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { JobEntity } from 'src/domain/entities/job.entity';

export class CategoryMapper {
  static toJobListItem(job: JobEntity): CategoryJobListItemResponse {
    return new CategoryJobListItemResponse(
      job.id,
      job.enterpriseName,
      job.jobTitle,
      job.candidatedAt,
      job.jobLink,
      job.observation,
    );
  }

  static toFindAllResponse(entity: CategoryEntity): FindAllCategoriesResponse {
    const jobs = (entity.jobs ?? []).map((job) =>
      CategoryMapper.toJobListItem(job),
    );
    return new FindAllCategoriesResponse(
      entity.id,
      entity.name,
      entity.order,
      jobs,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
