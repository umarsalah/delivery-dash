import { User } from './user.model';

import { REPOSITORIES } from 'src/constants';

export const userProvider = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: User,
  },
];
