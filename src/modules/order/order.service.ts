import { Inject, Injectable } from '@nestjs/common';
import { Addresses } from 'src/modules/address/address.model';

import { REPOSITORIES } from 'src/common/constants';
import { Users } from 'src/modules/user/user.model';
import { Orders } from './order.model';
import { OrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(REPOSITORIES.ORDERS_REPOSITORY)
    private ordersRepository: typeof Orders,
    @Inject(REPOSITORIES.ADDRESSES_REPOSITORY)
    private addressesRepository: typeof Addresses,
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private usersRepository: typeof Users,
  ) {}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get All Orders
  getAllOrders(): Promise<object[]> {
    return this.ordersRepository.findAll();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get Order By Id
  getOrderById(id: number): Promise<object> {
    return this.ordersRepository.findOne({ where: { id } });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete Order By Id
  deleteOrderById(id: number): Promise<number> {
    return this.ordersRepository.destroy({ where: { id } });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Create Order in DB and add address to DB
  async createOrder(order: OrderDto, user: any): Promise<string> {
    const { pickupAddress, dropoffAddress, ...orderObj } = order;
    const actionUser = { createdBy: user.email, updatedBy: user.email };

    const [pickupAddressObj, dropoffAddressObj] = await Promise.all([
      this.addressesRepository.create({
        ...pickupAddress,
        ...actionUser,
      }),
      this.addressesRepository.create({
        ...dropoffAddress,
        ...actionUser,
      }),
    ]);

    await this.ordersRepository.create({
      userId: user.id,
      ...orderObj,
      ...actionUser,
      pickupAddressId: pickupAddressObj.id,
      droppoffAddressId: dropoffAddressObj.id,
    });

    return 'Order created successfully';
  }
}
