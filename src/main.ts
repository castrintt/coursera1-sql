import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CORS_OPTIONS } from './shared/constants/cors.constant';
import { AllExceptionsFilter } from './shared/filter/http-exception.filter';
import { GlobalInterceptors } from './shared/interceptor/global.interceptors';
import { AppModule } from './shared/main.module';
import { GlobalPipes } from './shared/pipes/global.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser.default());
  app.enableCors(CORS_OPTIONS);
  app.useGlobalFilters(new AllExceptionsFilter());
  GlobalPipes.apply(app);
  GlobalInterceptors.apply(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
