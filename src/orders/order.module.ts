import { Module } from '@nestjs/common';
import { AddressesProvider } from 'src/addresses/addresses.provider';

import { DatabaseModule } from 'src/db/database.module';
import { UserProvider } from 'src/user/user.provider';

import { OrdersController } from './order.controller';
import { OrdersProvider } from './order.provider';
import { OrdersService } from './order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ...UserProvider,
    ...OrdersProvider,
    ...AddressesProvider,
  ],
})
export class OrderModule {}
