import { Orders } from './order.model';

import { REPOSITORIES } from 'src/common/constants';

export const OrdersProvider = [
  {
    provide: REPOSITORIES.ORDERS_REPOSITORY,
    useValue: Orders,
  },
];
