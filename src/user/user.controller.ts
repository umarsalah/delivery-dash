import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';

import { LoginUserDto, SignupDto } from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginUserDto) {
    return this.userService.login(email, password);
  }
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }
  @Get('users')
  async getUsers() {
    return this.userService.getAllUsers();
  }
  @Get('users/:userid')
  async getUser(@Param('userid') userid: number) {
    return this.userService.getUser(userid);
  }
  @Delete('users/:userid')
  async deleteUser(@Param('userid') userid: number) {
    return this.userService.deleteUser(userid);
  }
}
