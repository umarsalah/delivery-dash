import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { DatabaseModule } from '../db/database.module';
import { AddressProvider } from 'src/modules/address/address.provider';
import { AddressesModule } from 'src/modules/address/address.module';

@Module({
  imports: [AddressesModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider, ...AddressProvider],
})
export class UserModule {}
