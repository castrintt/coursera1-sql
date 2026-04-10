import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateJobCommand, DeleteJobCommand, SwitchJobCategoryCommand, UpdateJobCommand } from 'src/application/commands/job.commands';
import { CreateJobRequest } from 'src/application/dataTransferObjects/request/job/create.request';
import { SwitchJobCategoryRequest } from 'src/application/dataTransferObjects/request/job/switchCategory.request';
import { UpdateJobRequest } from 'src/application/dataTransferObjects/request/job/update.request';
import { GetJobByIdResponse } from 'src/application/dataTransferObjects/response/job/getById.response';
import { GetJobByIdQuery } from 'src/application/queries/job.query';

@Controller('jobs')
export class JobController {

  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) { }

  @Post('create')
  async createJob(@Body() request: CreateJobRequest): Promise<void> {
    const command = new CreateJobCommand(request.enterpriseName, request.jobTitle, request.candidatedAt, request.jobLink, request.observation, request.categoryId);
    return this._commandBus.execute(command);
  }

  @Get('getById')
  async getJobById(@Query('id', ParseUUIDPipe) id: string): Promise<GetJobByIdResponse> {
    const query = new GetJobByIdQuery(id);
    return this._queryBus.execute(query);
  }

  @Put('update')
  async updateJob(@Body() request: UpdateJobRequest): Promise<void> {
    const command = new UpdateJobCommand(request.id, request.enterpriseName, request.jobTitle, request.candidatedAt, request.jobLink, request.observation);
    return this._commandBus.execute(command);
  }

  @Put('switchCategory')
  async switchJobCategory(@Body() request: SwitchJobCategoryRequest): Promise<void> {
    const command = new SwitchJobCategoryCommand(request.id, request.categoryId);
    return this._commandBus.execute(command);
  }

  @Delete('delete')
  async deleteJob(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new DeleteJobCommand(id);
    return this._commandBus.execute(command);
  }

}
