import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  getData(): string {
    return 'this is order service';
  }
}
