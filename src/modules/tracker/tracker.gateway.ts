import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayInit,
  WebSocketServer,
  ConnectedSocket,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { namespace: 'tracker' })
export class TrackerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('TrackerGateway');

  afterInit(server: Server) {
    this.logger.log('TrackerGateway initialized');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @WebSocketServer()
  webSocket: Server;

  @SubscribeMessage('coordinates')
  track(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
    this.webSocket.emit('coordinates', data, client.id);
  }
}
