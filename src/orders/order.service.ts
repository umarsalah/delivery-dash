import { Inject, Injectable } from '@nestjs/common';

import { REPOSITORIES } from 'src/common/constants';
import { OrderDto } from './dto';
import { Orders } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(REPOSITORIES.ORDERS_REPOSITORY)
    private ordersRepository: typeof Orders,
  ) {}

  getAllOrders(): Promise<object[]> {
    return this.ordersRepository.findAll();
  }
  getOrderById(id: number): Promise<object> {
    return this.ordersRepository.findOne({ where: { id } });
  }
  deleteOrderById(id: number): Promise<number> {
    return this.ordersRepository.destroy({ where: { id } });
  }
  createOrder(order: OrderDto, userId: number): OrderDto {
    console.log(userId);
    return order;
  }
}
