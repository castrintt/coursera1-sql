import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class RequestTimingInterceptor implements NestInterceptor {
  private readonly _logger = new Logger(RequestTimingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const startedAt = Date.now();
    const routePath = request.route?.path ?? request.path;

    this._logger.log(`[→] ${request.method} ${routePath}`);

    return next.handle().pipe(
      finalize(() => {
        const durationMs = Date.now() - startedAt;
        this._logger.log(
          `[←] ${request.method} ${routePath} | ${durationMs}ms`,
        );
      }),
    );
  }
}
