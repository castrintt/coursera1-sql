import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryMapper } from 'src/application/mapper/category.mapper';
import { CategoryRepositorySymbol } from 'src/modules/symbols/symbols';
import { FindAllCategoriesResponse } from 'src/application/dto/response/category/findAll.response';
import { type ICategoryRepository } from 'src/domain/interfaces/ICategoryRepository';
import { FindAllCategoriesQuery } from '../../category.query';

@QueryHandler(FindAllCategoriesQuery)
export class FindAllCategoriesHandler
  implements IQueryHandler<FindAllCategoriesQuery>
{
  constructor(
    @Inject(CategoryRepositorySymbol)
    private readonly _category_repository: ICategoryRepository,
  ) {}

  async execute(
    query: FindAllCategoriesQuery,
  ): Promise<FindAllCategoriesResponse[]> {
    const categories = await this._category_repository.findByUserIdOrdered(
      query.requestingUserId,
    );
    return categories.map((category) =>
      CategoryMapper.toFindAllResponse(category),
    );
  }
}
