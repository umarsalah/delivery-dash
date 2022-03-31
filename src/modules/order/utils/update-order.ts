import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS, MESSAGES } from 'src/common/constants';
import { checkUpdateObject } from '.';

export const deliveryUpdateOrder = async (
  order,
  userId,
  ordersRepository,
  notificationService,
) => {
  if (checkUpdateObject.deliverer(order)) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: ERRORS.FORBIDDEN_UPDATE_ORDER,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  await ordersRepository.update(
    {
      delivererId: userId,
      updatedBy: userId,
      isAccepted: true,
      isDelivered: order.isDelivered ? true : false,
      isPaid: order.isPaid ? true : false,
      isPickedup: order.isPickedup ? true : false,
    },
    { where: { id: order.id } },
  );
  await notificationService.updateNotification(
    userId,
    order.id,
    MESSAGES.ORDER_ACCEPTED,
  );
  return order;
};

export const userUpdateOrder = async (
  order,
  userId,
  ordersRepository,
  notificationService,
) => {
  if (checkUpdateObject.user(order)) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: ERRORS.FORBIDDEN_UPDATE_ORDER,
      },
      HttpStatus.FORBIDDEN,
    );
  }
  const orderFromDB = await ordersRepository.findOne({
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
  await notificationService.createNotification(
    userId,
    order.id,
    MESSAGES.ORDER_CANCELLED,
  );
  order?.isCancelled &&
    (await ordersRepository.destroy({ where: { id: order.id } }));
  return order;
};
