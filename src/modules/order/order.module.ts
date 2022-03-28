import { Module } from '@nestjs/common';
import { AddressProvider } from 'src/modules/address/address.provider';

import { NotificationProvider } from '../notification/notification.provider';
import { DatabaseModule } from 'src/modules/db/database.module';
import { UserProvider } from 'src/modules/user/user.provider';

import { OrdersController } from './order.controller';
import { OrdersProvider } from './order.provider';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [
    OrderService,
    ...OrdersProvider,
    ...UserProvider,
    ...AddressProvider,
    ...NotificationProvider,
  ],
})
export class OrderModule {}
