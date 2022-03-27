import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

import { TrackerGateway } from './tracker.gateway';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [TrackerGateway],
})
export class TrackerModule {}
