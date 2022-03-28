import { Module } from '@nestjs/common';

import { AddressProvider } from './address.provider';
import { AddressService } from './address.service';

import { DatabaseModule } from 'src/modules/db/database.module';
@Module({
  imports: [DatabaseModule],
  exports: [AddressService],
  providers: [AddressService, ...AddressProvider],
})
export class AddressesModule {}
