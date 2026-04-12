import { NestFactory } from '@nestjs/core';
import { GlobalInterceptors } from './shared/interceptor/global.interceptors';
import { AppModule } from './shared/main.module';
import { GlobalPipes } from './shared/pipes/global.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  GlobalPipes.apply(app);
  GlobalInterceptors.apply(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
