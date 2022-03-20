import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';

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
  async getUser(@Param('userId') userid: number) {
    return this.userService.getUser(userid);
  }

  @Delete('users/:userId')
  @Roles('admin')
  async deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
