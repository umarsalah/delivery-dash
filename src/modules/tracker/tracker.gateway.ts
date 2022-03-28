import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayInit,
  WebSocketServer,
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { OrderCreatedEvent } from '../order/events/order-created.event';
import { EVENTS, USERS } from 'src/common/constants';
import { UserService } from '../user/user.service';

@WebSocketGateway()
// ws://localhost:3000/?userId=1
export class TrackerGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private userService: UserService) {}

  @WebSocketServer()
  webSocket: Server;

  private logger: Logger = new Logger('TrackerGateway');

  afterInit() {
    this.logger.log('TrackerGateway initialized');
  }

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

  @OnEvent(EVENTS.NEW_CREATED_ORDER)
  onNewCreatedOrder(event: OrderCreatedEvent) {
    this.logger.log(`New order created: ${event.orderId}`);
    this.webSocket
      .to([USERS.ADMIN, USERS.DELIVERY])
      .emit(EVENTS.NEW_CREATED_ORDER, event);
  }
}
