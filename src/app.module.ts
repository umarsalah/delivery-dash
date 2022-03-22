import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerModule } from './modules/logger/logger.module';
import { DatabaseModule } from './modules/db/database.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';

import configFile from 'config';

@Module({
  imports: [
    UserModule,
    OrderModule,
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
