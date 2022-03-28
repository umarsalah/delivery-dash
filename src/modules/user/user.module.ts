import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { DatabaseModule } from '../db/database.module';
import { AddressesModule } from 'src/modules/address/address.module';

@Module({
  imports: [AddressesModule, DatabaseModule],
  providers: [UserService, ...UserProvider],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
