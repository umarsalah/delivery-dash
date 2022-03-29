import { Inject, Injectable } from '@nestjs/common';

import { Notification } from './notification.model';
import { REPOSITORIES } from 'src/common/constants';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(REPOSITORIES.NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: typeof Notification,
  ) {}

  createNotification(
    userId: number,
    orderId: number,
    message: string,
  ): Promise<Notification> {
    return this.notificationRepository.create({
      userId,
      orderId,
      message,
      isRead: false,
      isActive: true,
    });
  }
  updateNotification(
    userId: number,
    orderId: number,
    message: string,
  ): Promise<any> {
    return this.notificationRepository.update(
      { message, isRead: true, isActive: false },
      { where: { userId, orderId } },
    );
  }
}
