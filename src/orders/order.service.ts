import { Inject, Injectable } from '@nestjs/common';

import { REPOSITORIES } from 'src/common/constants';
import { Orders } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(REPOSITORIES.ORDERS_REPOSITORY)
    private ordersRepository: typeof Orders,
  ) {}

  getAllOrders(): Promise<any> {
    return this.ordersRepository.findAll();
  }
  getOrderById(id: number): Promise<any> {
    return this.ordersRepository.findOne({ where: { id } });
  }
}
