import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AuthGuards, RolesGuard } from './common/guards';
import { UserService } from './modules/user/user.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UserService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalGuards(new AuthGuards(userService, new Reflector()));
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
