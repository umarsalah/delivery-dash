import { Module } from '@nestjs/common';

import { TrackerGateway } from './tracker.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [TrackerGateway],
})
export class TrackerModule {}
