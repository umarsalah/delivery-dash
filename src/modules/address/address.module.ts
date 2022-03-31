import { Module } from '@nestjs/common';

import { AddressProvider } from './address.provider';
import { AddressService } from './address.service';

@Module({
  exports: [AddressService],
  providers: [AddressService, ...AddressProvider],
})
export class AddressesModule {}
