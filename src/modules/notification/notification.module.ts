import { Module } from '@nestjs/common';

import { NotificationProvider } from './notification.provider';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, ...NotificationProvider],
  exports: [NotificationService],
})
export class NotificationModule {}
