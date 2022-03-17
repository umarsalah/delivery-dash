import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { REPOSITORIES, ERRORS } from '../constants';
import { comparePassword, hashPassword } from 'src/utils';
import { Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        throw new HttpException(ERRORS.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
      }

      const token = jwt.sign({ username: user.firstName }, 'secret', {
        expiresIn: '8h',
      });

      return {
        user: user.firstName,
        email: user.email,
        token,
      };
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
  async signup(body): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email },
      });
      if (user) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: ERRORS.USER_ALREADY_EXIST,
          },
          HttpStatus.FORBIDDEN,
        );
      } else {
        body.password = await hashPassword(body.password);
        const user = await this.userRepository.create(body);
        const token = jwt.sign({ username: user.email }, 'secret', {
          expiresIn: '8h',
        });

        return {
          user: user.firstName,
          email: user.email,
          token,
        };
      }
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  async getAllUsers(): Promise<any> {
    return await this.userRepository.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    });
  }
}
