import {
  Body,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { type Request } from 'express';
import {
  RefreshAuthCommand,
  SignInAuthCommand,
  SignOutCommand,
} from 'src/application/commands/auth.command';
import type { SignOutResult } from 'src/application/commands/handlers/auth/signOut.handler';
import { CreateAuthRequest } from 'src/application/dto/request/ auth/createAuth.request';
import { GetByIdResponse } from 'src/application/dto/response/user/getById.response';
import { AUTH_COOKIE_NAMES } from 'src/shared/constants/auth-cookies';
import { Public } from 'src/shared/decorator/public.decorator';
import { ClearAuthCookiesInterceptor } from 'src/shared/interceptor/clear-auth-cookies.interceptor';
import { SetAuthCookiesInterceptor } from 'src/shared/interceptor/set-auth-cookies.interceptor';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly _command_bus: CommandBus,
  ) { }

  @Post()
  @Public()
  @UseInterceptors(SetAuthCookiesInterceptor)
  async signin(
    @Body() request: CreateAuthRequest,
  ): Promise<GetByIdResponse> {
    return this._command_bus.execute(
      new SignInAuthCommand(request.email, request.password),
    );
  }


  @Post('refresh')
  @Public()
  @UseInterceptors(SetAuthCookiesInterceptor)
  async refresh(@Req() req: Request): Promise<GetByIdResponse> {
    const refreshToken = req.cookies?.[
      AUTH_COOKIE_NAMES.refreshToken
    ] as string | undefined;
    return this._command_bus.execute(new RefreshAuthCommand(refreshToken ?? ''));
  }

  @Post('logout')
  @Public()
  @UseInterceptors(ClearAuthCookiesInterceptor)
  async logout(): Promise<SignOutResult> {
    return this._command_bus.execute(new SignOutCommand());
  }

}
