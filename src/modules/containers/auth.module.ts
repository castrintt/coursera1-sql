import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/api/auth.controller';
import { RefreshAuthHandler } from 'src/application/commands/handlers/auth/refreshAuth.handler';
import { SignInAuthHandler } from 'src/application/commands/handlers/auth/signInAuth.handler';
import { SignOutHandler } from 'src/application/commands/handlers/auth/signOut.handler';
import { ClearAuthCookiesInterceptor } from 'src/shared/interceptor/clear-auth-cookies.interceptor';
import { SetAuthCookiesInterceptor } from 'src/shared/interceptor/set-auth-cookies.interceptor';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { UserContainerModule } from './user.container';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CqrsModule,
    UserContainerModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    SignInAuthHandler,
    SignOutHandler,
    SetAuthCookiesInterceptor,
    ClearAuthCookiesInterceptor,
    RefreshAuthHandler,
  ],
})
export class AuthModule { }
