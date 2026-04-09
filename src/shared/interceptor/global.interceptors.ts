import { INestApplication } from '@nestjs/common';
import { RequestTimingInterceptor } from './request-timing.interceptor';

export class GlobalInterceptors {
  public static apply(app: INestApplication): INestApplication {
    app.useGlobalInterceptors(new RequestTimingInterceptor());
    return app;
  }
}
