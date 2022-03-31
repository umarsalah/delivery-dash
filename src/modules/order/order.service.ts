import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  ERRORS,
  EVENTS,
  KM_PRICE,
  MESSAGES,
  REPOSITORIES,
} from 'src/common/constants';
import { OrderCreatedEvent } from './events/order-created.event';
import { checkUpdateObject, createOrderObject } from './utils';
import { OrderDto } from './dto';

import { NotificationService } from '../notification/notification.service';
import { AddressService } from '../address/address.service';

import { Orders } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject(REPOSITORIES.ORDERS_REPOSITORY)
    private ordersRepository: typeof Orders,

    private addressService: AddressService,
    private notificationService: NotificationService,
  ) {}

  // Get All Orders
  getAllOrders(): Promise<object[]> {
    return this.ordersRepository.scope('basic').findAll();
  }

  calculatePriceFromAddress(pickupAddress: any, dropoffAddress: any) {
    const distance = this.addressService.calculateDistance(
      pickupAddress,
      dropoffAddress,
    );

    const price = distance * KM_PRICE;
    return parseFloat(price.toFixed(2));
  }

  // Get Order By Id
  async getOrderById(id: number): Promise<any> {
    const order = await this.ordersRepository
      .scope('basic')
      .findOne({ where: { id } });

    if (order) {
      const [pickupAddress, dropoffAddress] = await Promise.all([
        this.addressService.findAddressById(order.pickupAddressId),
        this.addressService.findAddressById(order.droppoffAddressId),
      ]);
      return createOrderObject(order, pickupAddress, dropoffAddress);
    }
    return null;
  }

  // Delete Order By Id
  deleteOrderById(id: number): Promise<number> {
    return this.ordersRepository.destroy({ where: { id } });
  }

  // Create Order in DB and add address to DB
  async createOrder(order: OrderDto, user: any): Promise<object> {
    const { pickupAddress, dropoffAddress } = order;
    const totalPrice = this.calculatePriceFromAddress(
      pickupAddress,
      dropoffAddress,
    );

    const actionUser = { createdBy: user.id, updatedBy: user.id };

    const [pickupAddressObj, dropoffAddressObj] = await Promise.all([
      this.addressService.createAddress(pickupAddress, actionUser),
      this.addressService.createAddress(dropoffAddress, actionUser),
    ]);

    const newOrder = await this.ordersRepository.create({
      userId: user.id,
      totalPrice,
      ...actionUser,
      pickupAddressId: pickupAddressObj.id,
      droppoffAddressId: dropoffAddressObj.id,
    });
    await this.notificationService.createNotification(
      user.id,
      newOrder.id,
      MESSAGES.NEW_ORDER_CREATED,
    );

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

  // Update Order By Id
  async updateOrderById(order: any, user: any): Promise<any> {
    const { type, id: userId } = user;

    //deliverer can only update isPickedup, isDelivered, isPaid
    if (type === 'delivery') {
      if (checkUpdateObject.deliverer(order)) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: ERRORS.FORBIDDEN_UPDATE_ORDER,
          },
          HttpStatus.FORBIDDEN,
        );
      }

      await this.ordersRepository.update(
        {
          delivererId: userId,
          updatedBy: user.id,
          isAccepted: true,
          isDelivered: order.isDelivered ? true : false,
          isPaid: order.isPaid ? true : false,
          isPickedup: order.isPickedup ? true : false,
        },
        { where: { id: order.id } },
      );

      await this.notificationService.updateNotification(
        user.id,
        order.id,
        MESSAGES.ORDER_ACCEPTED,
      );
      return order;
    }

    // user can only update isCanceled
    if (type === 'user') {
      if (checkUpdateObject.user(order)) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: ERRORS.FORBIDDEN_UPDATE_ORDER,
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const orderFromDB = await this.ordersRepository.findOne({
        where: { id: order.id },
      });
      if (orderFromDB.isPickedup) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: ERRORS.ORDER_IS_PICKEDUP,
          },
          HttpStatus.FORBIDDEN,
        );
      }

      await this.notificationService.createNotification(
        user.id,
        order.id,
        MESSAGES.ORDER_CANCELLED,
      );
      order?.isCancelled &&
        (await this.ordersRepository.destroy({ where: { id: order.id } }));

      return order;
    }
    return null;
  }
}
