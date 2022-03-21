import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/db/database.module';

import { OrdersController } from './order.controller';
import { OrdersProvider } from './order.provider';
import { OrdersService } from './order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...OrdersProvider],
})
export class OrderModule {}
