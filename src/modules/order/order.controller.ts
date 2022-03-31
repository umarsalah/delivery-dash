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
import { RoleStatus } from 'src/common/constants';
import { OrderDto, UpdateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  @Roles(RoleStatus.ADMIN, RoleStatus.DELIVERY)
  getAllOrders(): Promise<object[]> {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  @Public()
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  @Roles(RoleStatus.ADMIN)
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.ordersService.deleteOrderById(id);
  }

  @Post()
  @Roles(RoleStatus.USER)
  createOrder(
    @Body() order: OrderDto,
    @User() user: { id: number },
  ): Promise<object> {
    return this.ordersService.createOrder(order, user);
  }

  @Roles(RoleStatus.USER, RoleStatus.DELIVERY)
  @Put()
  updateOrder(
    @Body() order: UpdateOrderDto,
    @User() user: { userId: number },
  ): Promise<object> {
    return this.ordersService.updateOrderById(order, user);
  }
}
