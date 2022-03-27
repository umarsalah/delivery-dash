import {
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway(8080, { namespace: 'tracker' })
export class TrackerGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('coordinates')
  track(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    this.server.emit('coordinates', data, client.id);
    return 'ok';
  }
}
