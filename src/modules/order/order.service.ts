import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Notification } from '../notification/notification.model';
import { Addresses } from 'src/modules/address/address.model';
import { Orders } from './order.model';

import { OrderCreatedEvent } from './events/order-created.event';
import { REPOSITORIES, EVENTS, MESSAGES } from 'src/common/constants';
import { createOrderObject } from './utils';
import { OrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject(REPOSITORIES.ORDERS_REPOSITORY)
    private ordersRepository: typeof Orders,
    @Inject(REPOSITORIES.ADDRESSES_REPOSITORY)
    private addressesRepository: typeof Addresses,
    @Inject(REPOSITORIES.NOTIFICATION_REPOSITORY)
    private notificationRepository: typeof Notification,
  ) {}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get All Orders
  getAllOrders(): Promise<object[]> {
    return this.ordersRepository.scope('basic').findAll();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get Order By Id
  async getOrderById(id: number): Promise<any> {
    const order = await this.ordersRepository
      .scope('basic')
      .findOne({ where: { id } });
    if (order) {
      const pickupAddress = await this.addressesRepository
        .scope('basic')
        .findOne({
          where: { id: order?.pickupAddressId },
        });
      const dropoffAddress = await this.addressesRepository
        .scope('basic')
        .findOne({
          where: { id: order?.droppoffAddressId },
        });
      return createOrderObject(order, pickupAddress, dropoffAddress);
    }
    return null;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete Order By Id
  deleteOrderById(id: number): Promise<number> {
    return this.ordersRepository.destroy({ where: { id } });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Create Order in DB and add address to DB
  async createOrder(order: OrderDto, user: any): Promise<object> {
    const { pickupAddress, dropoffAddress, ...orderObj } = order;

    const actionUser = { createdBy: user.id, updatedBy: user.id };

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

    const newOrder = await this.ordersRepository.create({
      userId: user.id,
      ...orderObj,
      ...actionUser,
      pickupAddressId: pickupAddressObj.id,
      droppoffAddressId: dropoffAddressObj.id,
    });

    await this.notificationRepository.create({
      userId: user.id,
      orderId: newOrder.id,
      isRead: false,
      isActive: true,
      message: MESSAGES.NEW_ORDER_CREATED,
    });

    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.orderId = newOrder.id;
    orderCreatedEvent.isRead = false;
    orderCreatedEvent.isActive = newOrder.isPickedup;
    orderCreatedEvent.pickupAddress = pickupAddress;
    orderCreatedEvent.dropoffAddress = dropoffAddress;
    orderCreatedEvent.message = MESSAGES.NEW_ORDER_CREATED;

    this.eventEmitter.emit(EVENTS.NEW_CREATED_ORDER, orderCreatedEvent);

    return newOrder;
  }
}
