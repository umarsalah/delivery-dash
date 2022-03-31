import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { AddressesModule } from 'src/modules/address/address.module';

@Module({
  imports: [AddressesModule],
  providers: [UserService, ...UserProvider],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
