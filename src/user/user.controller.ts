import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { LoginUserDto, SignupDto } from './dto';

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
}
