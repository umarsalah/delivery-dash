import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from './modules/db/database.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';

import configFile from 'config';
import { TrackerModule } from './modules/tracker/tracker.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    TrackerModule,
    DatabaseModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
