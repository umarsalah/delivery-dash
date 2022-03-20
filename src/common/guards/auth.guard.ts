import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from 'src/user/user.service';
import { verifyToken } from 'src/utils/jwt';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      'public',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    if (!token) {
      return false;
    }

    const decoded: any = await verifyToken(token, 'secret');
    const userFromDb = await this.userService.getUserByEmail(decoded.email);
    if (!userFromDb) {
      return false;
    }

    request.user = userFromDb.type;
    return true;
  }
}
