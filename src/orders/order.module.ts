import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/db/database.module';

import { OrderController } from './order.controller';
import { OrdersService } from './order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrdersService],
})
export class OrderModule {}
