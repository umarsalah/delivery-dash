import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { Public, Roles } from '../../common/decorators';
import { LoginUserDto, SignupDto } from './dto';
import { RoleStatus } from 'src/common/constants';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Public()
  login(@Body() { email, password }: LoginUserDto) {
    return this.userService.login(email, password);
  }

  @Post('signup')
  @Public()
  signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }

  @Get('users')
  @Roles(RoleStatus.ADMIN)
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('users/:userId')
  @Public()
  getOneUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Delete('users/:userId')
  @Roles(RoleStatus.ADMIN)
  deleteOneUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUserById(userId);
  }
}
