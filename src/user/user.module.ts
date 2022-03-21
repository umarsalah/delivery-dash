import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider],
})
export class UserModule {}
