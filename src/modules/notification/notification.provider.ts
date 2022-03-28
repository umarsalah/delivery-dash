import { REPOSITORIES } from 'src/common/constants';

import { Notification } from './notification.model';

export const NotificationProvider = [
  {
    provide: REPOSITORIES.NOTIFICATION_REPOSITORY,
    useValue: Notification,
  },
];
