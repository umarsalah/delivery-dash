import { Controller, Get } from '@nestjs/common';

import { Public } from 'src/common/decorators';

@Controller('orders')
export class OrderController {
  @Get()
  @Public()
  getHello(): string {
    return 'Hello World!';
  }
}
