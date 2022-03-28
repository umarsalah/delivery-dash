import { Inject, Injectable } from '@nestjs/common';

import { Notification } from './notification.model';
import { MESSAGES, REPOSITORIES } from 'src/common/constants';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(REPOSITORIES.NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: typeof Notification,
  ) {}

  createNotification(userId: number, orderId: number): Promise<Notification> {
    return this.notificationRepository.create({
      userId: userId,
      orderId: orderId,
      isRead: false,
      isActive: true,
      message: MESSAGES.NEW_ORDER_CREATED,
    });
  }
}
