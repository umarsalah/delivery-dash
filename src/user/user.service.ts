import { Injectable, Inject, HttpException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { REPOSITORIES, ERRORS } from '../constants';
import { comparePassword } from 'src/utils';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new HttpException(ERRORS.USER_NOT_FOUND, 404);
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        throw new HttpException(ERRORS.WRONG_PASSWORD, 401);
      }

      const token = jwt.sign({ username: user.firstName }, 'secret', {
        expiresIn: '8h',
      });

      return {
        user: user.firstName,
        token,
      };
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
