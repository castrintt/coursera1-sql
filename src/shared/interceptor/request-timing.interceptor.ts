import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class RequestTimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<{ method: string; url: string }>();
    const startedAt = Date.now();
    const entryIso = new Date().toISOString();

    console.log(`[HTTP →] ${request.method} ${request.url} | entrada: ${entryIso}`);

    return next.handle().pipe(
      finalize(() => {
        const durationMs = Date.now() - startedAt;
        const exitIso = new Date().toISOString();
        console.log(
          `[HTTP ←] ${request.method} ${request.url} | saída: ${exitIso} | duração: ${durationMs}ms`,
        );
      }),
    );
  }
}
