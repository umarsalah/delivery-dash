import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { REPOSITORIES, ERRORS, UserObject, User } from '../../common/constants';
import { AddressService } from 'src/modules/address/address.service';
import { comparePassword, hashPassword } from 'src/common/utils';
import { Addresses } from 'src/modules/address/address.model';
import { generateToken } from 'src/common/utils/jwt';
import { Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(AddressService)
    private readonly addressService: AddressService,
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

    return {
      user: user.firstName,
      email: user.email,
      token: generateToken(user.email),
    };
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  Create User in DB and add address to DB
  async signup(body): Promise<UserObject> {
    const { address, ...userObj } = body;

    const user = await this.getUserByEmail(userObj.email);
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

    return {
      user: user.firstName,
      email: user.email,
      token: generateToken(user.email),
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
