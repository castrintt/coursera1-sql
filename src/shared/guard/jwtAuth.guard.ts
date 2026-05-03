import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { IS_PUBLIC_KEY } from 'src/shared/decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest<TUser>(err: Error | undefined, user: TUser): TUser {
    if (err ?? !user) {
      throw (
        err ?? new UnauthorizedException(ApiErrorMessages.auth.unauthorized)
      );
    }
    return user;
  }
}
