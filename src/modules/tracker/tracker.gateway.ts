import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  SubscribeMessage,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { REPOSITORIES } from 'src/common/constants';
import { Users } from '../user/user.model';

@WebSocketGateway()
// ws://localhost:3000/?userId=1
export class TrackerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private usersRepository: typeof Users,
  ) {}

  @WebSocketServer()
  webSocket: Server;

  private logger: Logger = new Logger('TrackerGateway');

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.handshake.query.userId[0]}`);

    const userId = client.handshake.query.userId;
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    client.join(user.type);
    client.emit('joinedRoom', user.type);
  }
  handleDisconnect(client: Socket) {
    client.leave(client.handshake.query.userId[0]);
    this.logger.log(`Client disconnected: ${client.handshake.query.userId[0]}`);
  }

  @SubscribeMessage('newOrder')
  onNewOrder(client: Socket, data: any) {
    this.webSocket.to(['delivery', 'admin']).emit('newOrder', data);
  }
}
