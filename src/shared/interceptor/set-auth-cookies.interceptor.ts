import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ACCESS_TOKEN_MAX_AGE_MS,
  AUTH_COOKIE_NAMES,
  getAccessTokenSetCookieOptions,
  getRefreshTokenSetCookieOptions,
  REFRESH_TOKEN_MAX_AGE_MS,
} from 'src/shared/constants/auth-cookies';

function hasAuthTokens(
  data: unknown,
): data is { accessToken: string; refreshToken: string } & Record<string, unknown> {
  if (typeof data !== 'object' || data === null) return false;
  const record = data as Record<string, unknown>;
  return (
    typeof record.accessToken === 'string' &&
    typeof record.refreshToken === 'string'
  );
}

@Injectable()
export class SetAuthCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const response = http.getResponse<Response>();
    return next.handle().pipe(
      map((data: unknown) => {
        if (!hasAuthTokens(data)) return data;
        const { accessToken, refreshToken, ...rest } = data;
        response.cookie(
          AUTH_COOKIE_NAMES.accessToken,
          accessToken,
          getAccessTokenSetCookieOptions(ACCESS_TOKEN_MAX_AGE_MS),
        );

        response.cookie(
          AUTH_COOKIE_NAMES.refreshToken,
          refreshToken,
          getRefreshTokenSetCookieOptions(REFRESH_TOKEN_MAX_AGE_MS),
        );

        return rest;
      }),
    );
  }
}
