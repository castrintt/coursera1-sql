import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import {
  CreateUserCommand,
  DeleteUserCommand,
  SendUserResetPasswordEmailCommand,
  UpdateUserCommand,
  UpdateUserPasswordCommand,
} from 'src/application/commands/user.command';
import { CreateRequest } from 'src/application/dto/request/user/create.request';
import { UpdateUserRequest } from 'src/application/dto/request/user/update.request';
import { UpdateUserPasswordRequest } from 'src/application/dto/request/user/updatePassword.request';
import { GetByIdResponse } from 'src/application/dto/response/user/getById.response';
import { GetUserByIdQuery } from 'src/application/queries/user.query';
import { EmailUnique } from 'src/shared/decorator/email-unique.decorator';
import { Public } from 'src/shared/decorator/public.decorator';
import { EmailAlreadyExistsGuard } from 'src/shared/guard/email-already-exists.guard';
import { brParseUuidPipe } from 'src/shared/pipes/br-parse-uuid.pipe';

type AuthenticatedRequest = Request & { user: { userId: string; email: string } };

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly _command_bus: CommandBus,
    private readonly _query_bus: QueryBus,
  ) {}

  @Get(':id')
  async getUserById(
    @Req() req: AuthenticatedRequest,
    @Param('id', brParseUuidPipe) id: string,
  ): Promise<GetByIdResponse> {
    const query = new GetUserByIdQuery(id, req.user.userId);
    return this._query_bus.execute<GetUserByIdQuery, GetByIdResponse>(query);
  }

  @Post('create')
  @Public()
  @EmailUnique('create')
  @UseGuards(EmailAlreadyExistsGuard)
  async createUser(@Body() request: CreateRequest): Promise<void> {
    const command = new CreateUserCommand(
      request.name,
      request.email,
      request.password,
    );
    return this._command_bus.execute<CreateUserCommand>(command);
  }

  @Delete(':id')
  async deleteUser(
    @Req() req: AuthenticatedRequest,
    @Param('id', brParseUuidPipe) id: string,
  ): Promise<void> {
    const command = new DeleteUserCommand(id, req.user.userId);
    return this._command_bus.execute<DeleteUserCommand>(command);
  }

  @Put('update')
  @EmailUnique('update')
  @UseGuards(EmailAlreadyExistsGuard)
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Query('id', brParseUuidPipe) id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<void> {
    const command = new UpdateUserCommand(
      id,
      req.user.userId,
      request.name,
      request.email,
    );
    return this._command_bus.execute<UpdateUserCommand>(command);
  }

  @Put('update_password')
  async updateUserPassword(
    @Req() req: AuthenticatedRequest,
    @Query('id', brParseUuidPipe) id: string,
    @Body() request: UpdateUserPasswordRequest,
  ): Promise<void> {
    const command = new UpdateUserPasswordCommand(
      id,
      req.user.userId,
      request.password,
    );
    return this._command_bus.execute<UpdateUserPasswordCommand>(command);
  }

  @Post('send_email_reset_password')
  async sendEmailResetPassword(
    @Req() req: AuthenticatedRequest,
    @Query('id', brParseUuidPipe) id: string,
  ): Promise<void> {
    const command = new SendUserResetPasswordEmailCommand(id, req.user.userId);
    return this._command_bus.execute<SendUserResetPasswordEmailCommand>(
      command,
    );
  }
}
