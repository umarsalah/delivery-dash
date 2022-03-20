import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { REPOSITORIES, ERRORS, UserObject, User } from '../common/constants';
import { comparePassword, hashPassword } from 'src/utils';
import { Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
  ) {}

  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: ['id', 'firstName', 'lastName', 'type'],
    });
  }

  async login(email: string, password: string): Promise<UserObject> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.NOT_FOUND);
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign({ user: user.email }, 'secret', {
      expiresIn: '8h',
    });

    return {
      user: user.firstName,
      email: user.email,
      token,
    };
  }
  async signup(body): Promise<UserObject> {
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
      const token = jwt.sign({ user: user.email }, 'secret', {
        expiresIn: '8h',
      });

      return {
        user: user.firstName,
        email: user.email,
        token,
      };
    }
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    });
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    });
    return user;
  }

  async deleteUser(id: number): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ERRORS.USER_NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.destroy({
      where: { id },
    });
    return id;
  }
}
