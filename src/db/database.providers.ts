import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

import { DATABASE_PROVIDER, DATABASE_CONFIG } from '../constants';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([__dirname + '/**/*.model.ts']);
      await sequelize.sync();
      return sequelize;
    },
  },
];
