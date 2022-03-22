import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { DatabaseModule } from '../db/database.module';
import { AddressesProvider } from 'src/addresses/addresses.provider';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [AddressesModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider, ...AddressesProvider],
})
export class UserModule {}
