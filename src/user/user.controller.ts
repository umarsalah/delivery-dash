import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { Public, Roles } from '../common/decorators';
import { LoginUserDto, SignupDto } from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Public()
  async login(@Body() { email, password }: LoginUserDto) {
    return this.userService.login(email, password);
  }

  @Post('signup')
  @Public()
  async signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }

  @Get('users')
  @Roles('admin')
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('users/:userId')
  @Public()
  async getUser(@Param('userId', ParseIntPipe) userid: number) {
    return this.userService.getUser(userid);
  }

  @Delete('users/:userId')
  @Roles('admin')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
