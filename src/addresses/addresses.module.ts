import { Module } from '@nestjs/common';

import { AddressesController } from './addresses.controller';
import { AddressesProvider } from './addresses.provider';
import { AddressesService } from './addresses.service';

import { DatabaseModule } from 'src/db/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [AddressesController],
  providers: [AddressesService, ...AddressesProvider],
})
export class AddressesModule {}
