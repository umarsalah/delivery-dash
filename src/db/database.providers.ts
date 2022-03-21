import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, DATABASE_CONFIG } from '../common/constants';

import { Addresses } from '../addresses/addresses.model';
import { Orders } from '../orders/order.model';
import { Users } from '../user/user.model';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([Users, Orders, Addresses]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
