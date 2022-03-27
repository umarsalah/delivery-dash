import { Module } from '@nestjs/common';
import { UserProvider } from '../user/user.provider';

import { TrackerGateway } from './tracker.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [TrackerGateway, ...UserProvider],
})
export class TrackerModule {}
