import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateCategoryCommand,
  DeleteCategoryCommand,
  UpdateCategoryCommand,
} from 'src/application/commands/category.commands';
import { CreateCategoryRequest } from 'src/application/dto/request/category/create.request';
import { UpdateCategoryRequest } from 'src/application/dto/request/category/update.request';
import { FindAllCategoriesResponse } from 'src/application/dto/response/category/findAll.response';

import { FindAllCategoriesQuery } from 'src/application/queries/category.query';
import { brParseUuidPipe } from 'src/shared/pipes/br-parse-uuid.pipe';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly _query_bus: QueryBus,
    private readonly _command_bus: CommandBus,
  ) { }

  @Post('create')
  async createCategory(@Body() request: CreateCategoryRequest): Promise<void> {
    const command = new CreateCategoryCommand(
      request.userId,
      request.name,
      request.order,
    );
    return this._command_bus.execute(command);
  }

  @Put('update')
  async updateCategory(@Body() request: UpdateCategoryRequest): Promise<void> {
    const command = new UpdateCategoryCommand(
      request.id,
      request.name,
      request.order,
    );
    return this._command_bus.execute(command);
  }

  @Delete('delete')
  async deleteCategory(
    @Query('id', brParseUuidPipe) id: string,
  ): Promise<void> {
    const command = new DeleteCategoryCommand(id);
    return this._command_bus.execute(command);
  }

  @Get('findAll')
  async findAllCategories(
    @Query('userId', brParseUuidPipe) userId: string,
  ): Promise<FindAllCategoriesResponse[]> {
    const query = new FindAllCategoriesQuery(userId);
    return this._query_bus.execute(query);
  }
}
