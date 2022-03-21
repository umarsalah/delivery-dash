import { Inject, Injectable } from '@nestjs/common';

import { REPOSITORIES } from 'src/common/constants';
import { Orders } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(REPOSITORIES.ORDERS_REPOSITORY)
    private ordersRepository: typeof Orders,
  ) {}

  getData(): string {
    return 'this is order service';
  }
}
