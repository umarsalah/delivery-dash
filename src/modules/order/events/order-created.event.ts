export class OrderCreatedEvent {
  orderId: number;
  message: string;
  isRead: boolean;
  isActive: boolean;
  pickupAddress: object;
  dropoffAddress: object;
}
