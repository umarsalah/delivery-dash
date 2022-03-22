import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { OrdersService } from './order.service';

import { Public, Roles } from 'src/common/decorators';
import { OrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles('admin', 'deliverer')
  async getAllOrders(): Promise<object[]> {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  @Public()
  async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  @Roles('admin')
  async deleteOrderById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number> {
    return this.ordersService.deleteOrderById(id);
  }

  @Post('/:userId')
  @Public()
  async createOrder(
    @Body() order: OrderDto,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<string> {
    return this.ordersService.createOrder(order, userId);
  }
}
