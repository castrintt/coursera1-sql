import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

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
        response.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: FIFTEEN_MINUTES_MS,
          path: '/',
        });

        response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: SEVEN_DAYS_MS,
          path: '/auth',
        });

        return rest;
      }),
    );
  }
}
