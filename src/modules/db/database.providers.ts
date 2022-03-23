import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, DATABASE_CONFIG } from '../../common/constants';

import { Addresses } from '../address/address.model';
import { Orders } from '../order/order.model';
import { Users } from '../user/user.model';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([Users, Orders, Addresses]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
