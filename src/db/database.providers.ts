import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, DATABASE_CONFIG } from '../common/constants';

import { Users } from '../user/user.model';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([Users]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
