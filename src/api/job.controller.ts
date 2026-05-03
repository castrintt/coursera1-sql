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
  CreateJobCommand,
  DeleteJobCommand,
  SwitchJobCategoryCommand,
  UpdateJobCommand,
} from 'src/application/commands/job.commands';
import { CreateJobRequest } from 'src/application/dto/request/job/create.request';
import { SwitchJobCategoryRequest } from 'src/application/dto/request/job/switchCategory.request';
import { UpdateJobRequest } from 'src/application/dto/request/job/update.request';
import { FindAllJobsResponse } from 'src/application/dto/response/job/findAll.response';
import { GetJobByIdResponse } from 'src/application/dto/response/job/getById.response';
import { FindAllJobsQuery, GetJobByIdQuery } from 'src/application/queries/job.query';
import { brParseUuidPipe } from 'src/shared/pipes/br-parse-uuid.pipe';

@Controller('jobs')
export class JobController {
  constructor(
    private readonly _query_bus: QueryBus,
    private readonly _command_bus: CommandBus,
  ) { }

  @Post('create')
  async createJob(@Body() request: CreateJobRequest): Promise<void> {
    const command = new CreateJobCommand(
      request.enterpriseName,
      request.jobTitle,
      request.candidatedAt,
      request.jobLink,
      request.observation,
      request.categoryId,
    );
    return this._command_bus.execute(command);
  }

  @Get('getById')
  async getJobById(
    @Query('id', brParseUuidPipe) id: string,
  ): Promise<GetJobByIdResponse> {
    const query = new GetJobByIdQuery(id);
    return this._query_bus.execute(query);
  }

  @Get('findAll')
  async findAllJobs(
    @Query('categoryId', brParseUuidPipe) categoryId: string,
  ): Promise<FindAllJobsResponse[]> {
    const query = new FindAllJobsQuery(categoryId);
    return this._query_bus.execute(query);
  }

  @Put('update')
  async updateJob(@Body() request: UpdateJobRequest): Promise<void> {
    const command = new UpdateJobCommand(
      request.id,
      request.enterpriseName,
      request.jobTitle,
      request.candidatedAt,
      request.jobLink,
      request.observation,
    );
    return this._command_bus.execute(command);
  }

  @Put('switchCategory')
  async switchJobCategory(
    @Body() request: SwitchJobCategoryRequest,
  ): Promise<void> {
    const command = new SwitchJobCategoryCommand(
      request.id,
      request.categoryId,
    );
    return this._command_bus.execute(command);
  }

  @Delete('delete')
  async deleteJob(@Query('id', brParseUuidPipe) id: string): Promise<void> {
    const command = new DeleteJobCommand(id);
    return this._command_bus.execute(command);
  }
}
