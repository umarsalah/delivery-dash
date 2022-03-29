import {
  Put,
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
import { USERS } from 'src/common/constants';
import { OrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  @Roles(USERS.ADMIN, USERS.DELIVERY)
  getAllOrders(): Promise<object[]> {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  @Public()
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  @Roles(USERS.ADMIN)
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.ordersService.deleteOrderById(id);
  }

  @Post()
  @Roles(USERS.USER)
  createOrder(
    @Body() order: OrderDto,
    @User() user: { id: number },
  ): Promise<object> {
    return this.ordersService.createOrder(order, user);
  }

  @Roles(USERS.USER, USERS.DELIVERY)
  @Put()
  updateOrder(
    @Body() order: any,
    @User() user: { userId: number },
  ): Promise<object> {
    return this.ordersService.updateOrderById(order, user);
  }
}
