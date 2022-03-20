import { Users } from './user.model';

import { REPOSITORIES } from 'src/common/constants';

export const userProvider = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: Users,
  },
];
