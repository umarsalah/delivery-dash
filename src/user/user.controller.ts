import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { LoginUserDto } from './dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginUserDto) {
    return this.userService.login(email, password);
  }
}
