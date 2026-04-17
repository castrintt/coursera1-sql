import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/api/auth.controller';
import { RefreshAuthHandler } from 'src/application/commands/handlers/auth/refreshAuth.handler';
import { SignInAuthHandler } from 'src/application/commands/handlers/auth/signInAuth.handler';
import { jwtConstants } from 'src/shared/constants/jwt.constant';
import { SetAuthCookiesInterceptor } from 'src/shared/interceptor/set-auth-cookies.interceptor';
import { UserContainerModule } from './user.container';

@Module({
  imports: [
    CqrsModule,
    UserContainerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignInAuthHandler,
    SetAuthCookiesInterceptor,
    RefreshAuthHandler
  ],
})
export class AuthModule { }
