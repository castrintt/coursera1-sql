import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clearAuthCookies } from 'src/shared/constants/auth-cookies';

@Injectable()
export class ClearAuthCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const response = http.getResponse<Response>();
    return next.handle().pipe(
      map((data: unknown) => {
        clearAuthCookies(response);
        return data;
      }),
    );
  }
}
