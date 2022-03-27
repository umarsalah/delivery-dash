import { Logger } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';

@WebSocketGateway()
// ws://localhost:3000/?userId=1
export class TrackerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private userService: UserService) {}

  @WebSocketServer()
  webSocket: Server;

  private logger: Logger = new Logger('TrackerGateway');

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.handshake.query.userId[0]}`);

    const userId = client.handshake.query.userId;
    if (userId) {
      const userType = await this.userService.getUserType(userId?.[0]);
      userType && client.join(userType);
      userType && this.logger.log(`Client joined: ${userType}`);
    }
  }
  handleDisconnect(client: Socket) {
    client.leave(client.handshake.query.userId[0]);
    this.logger.log(`Client disconnected: ${client.handshake.query.userId[0]}`);
  }

  onNewOrder(client: Socket, data: any) {
    this.webSocket.to(['delivery', 'admin']).emit('newOrder', data);
  }
}
