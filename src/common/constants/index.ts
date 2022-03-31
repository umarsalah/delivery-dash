export const DATABASE_CONFIG = 'database';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  token?: string;
  phoneNumber?: string;
};

import EVENTS from './events';
import ERRORS from './errors';
import PROVIDERS from './providers';
import { RoleStatus } from './enums';
import MESSAGES from './notifications';
import REPOSITORIES from './repositories';

export const KM_PRICE = 0.5;

export { ERRORS, MESSAGES, REPOSITORIES, EVENTS, RoleStatus, PROVIDERS };
