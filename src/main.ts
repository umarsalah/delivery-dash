import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AuthGuards, RolesGuard } from './common/guards';
import { UserService } from './modules/user/user.service';

import { AppModule } from './app.module';
import { MyLogger } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/v1');
  app.useLogger(app.get(MyLogger));
  app.useGlobalGuards(new AuthGuards(app.get(UserService), new Reflector()));
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
}
bootstrap();
