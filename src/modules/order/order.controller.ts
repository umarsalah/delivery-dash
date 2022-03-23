import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { OrderService } from './order.service';

import { User } from 'src/common/decorators/user.decorator';
import { Public, Roles } from 'src/common/decorators';
import { OrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  @Roles('admin', 'deliverer')
  getAllOrders(): Promise<object[]> {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  @Public()
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  @Roles('admin')
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.ordersService.deleteOrderById(id);
  }

  @Post()
  @Roles('user')
  createOrder(
    @Body() order: OrderDto,
    @User() user: { id: number },
  ): Promise<string> {
    return this.ordersService.createOrder(order, user);
  }
}
