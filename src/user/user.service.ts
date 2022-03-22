import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { REPOSITORIES, ERRORS, UserObject, User } from '../common/constants';
import { Addresses } from 'src/addresses/addresses.model';
import { comparePassword, hashPassword } from 'src/utils';
import { Users } from './user.model';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(AddressesService)
    private readonly addressService: AddressesService,
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
    @Inject(REPOSITORIES.ADDRESSES_REPOSITORY)
    private addressRepository: typeof Addresses,
  ) {}

  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: ['id', 'firstName', 'lastName', 'type'],
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // login user
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  Create User in DB and add address to DB
  async signup(body): Promise<UserObject> {
    const { address, ...userObj } = body;

    const user = await this.userRepository.findOne({
      where: { email: userObj.email, deletedAt: null },
    });
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: ERRORS.USER_ALREADY_EXIST,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    userObj.password = await hashPassword(userObj.password);

    const addressId = await this.addressService.checkAddress(
      address.longitude,
      address.latitude,
    );
    console.log(addressId);

    if (!addressId) {
      const userAddress = await this.addressRepository.create({
        ...address,
        createdBy: userObj.createdBy,
        updatedBy: userObj.updatedBy,
      });

      await this.userRepository.create({
        ...userObj,
        addressId: userAddress.id,
      });
    } else {
      await this.userRepository.create({ ...userObj, addressId: addressId });
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get All Users from DB
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    });
    return users;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get User By id param from DB
  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: ['id', 'firstName', 'lastName', 'email', 'type'],
    });
    return user;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete User By id param from DB
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
