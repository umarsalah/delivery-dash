import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './db/database.module';
import { OrderModule } from './orders/order.module';
import { UserModule } from './user/user.module';

import configFile from 'config';

@Module({
  imports: [
    UserModule,
    OrderModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
