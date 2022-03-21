import { Controller, Delete, Get, Param } from '@nestjs/common';

import { OrdersService } from './order.service';

import { Public, Roles } from 'src/common/decorators';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles('admin', 'deliverer')
  async getAllOrders(): Promise<any> {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  @Public()
  async getOrderById(@Param('id') id: number): Promise<any> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  @Roles('admin')
  async deleteOrderById(@Param('id') id: number): Promise<any> {
    return this.ordersService.deleteOrderById(id);
  }
}
