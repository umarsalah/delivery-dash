import { Module } from '@nestjs/common';

import { NotificationModule } from '../notification/notification.module';
import { AddressesModule } from '../address/address.module';
import { UserModule } from '../user/user.module';

import { OrdersController } from './order.controller';
import { OrdersProvider } from './order.provider';
import { OrderService } from './order.service';

@Module({
  imports: [UserModule, NotificationModule, AddressesModule],
  providers: [OrderService, ...OrdersProvider],
  controllers: [OrdersController],
  exports: [OrderService],
})
export class OrderModule {}
