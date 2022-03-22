import { Module } from '@nestjs/common';
import { AddressProvider } from 'src/modules/address/address.provider';

import { DatabaseModule } from 'src/modules/db/database.module';
import { UserProvider } from 'src/modules/user/user.provider';
import { LoggerModule } from '../logger/logger.module';

import { OrdersController } from './order.controller';
import { OrdersProvider } from './order.provider';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [OrdersController],
  providers: [
    OrderService,
    ...UserProvider,
    ...OrdersProvider,
    ...AddressProvider,
  ],
})
export class OrderModule {}
