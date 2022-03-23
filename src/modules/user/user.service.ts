import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { REPOSITORIES, ERRORS, UserObject, User } from '../../common/constants';
import { AddressService } from 'src/modules/address/address.service';
import { comparePassword, hashPassword } from 'src/common/utils';
import { Addresses } from 'src/modules/address/address.model';
import { checkUser, createUserObject } from './utils';
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
    });
  }

  // login user
  async login(email: string, password: string): Promise<UserObject> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    checkUser(user);
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }

    return {
      user: user.firstName,
      email: user.email,
      token: generateToken(user.email),
      type: user.type,
    };
  }

  //  Create User in DB and add address to DB
  async signup(body): Promise<UserObject> {
    const { address, ...userObj } = body;
    let addedAddress = 0;

    const user = await this.getUserByEmail(userObj.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: ERRORS.USER_ALREADY_EXIST,
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      userObj.password = await hashPassword(userObj.password);

      const addressId = await this.addressService.checkAddress(
        address.longitude,
        address.latitude,
      );
      if (!addressId) {
        const newAddress = await this.addressRepository.create({
          ...address,
          createdBy: userObj.email,
          updatedBy: userObj.email,
        });
        addedAddress = newAddress.id;
      } else {
        addedAddress = addressId;
      }
      await this.userRepository.create({
        ...userObj,
        addressId: addedAddress,
        createdBy: userObj.email,
        updatedBy: userObj.email,
      });

      return {
        user: userObj.firstName,
        email: userObj.email,
        type: userObj.type,
        token: generateToken(userObj.email),
      };
    }
  }

  // Get All Users from DB
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.scope('notDeleted').findAll();
    return users;
  }

  // Get User By id param from DB
  async getUser(id: number): Promise<object> {
    const user = await this.userRepository.scope('notDeleted').findOne({
      where: { id },
    });
    if (user) {
      const address = await this.addressRepository.scope('basic').findOne({
        where: { id: user.addressId },
      });
      return createUserObject(user, address);
    }
    return null;
  }

  // Delete User By id param from DB
  async deleteUser(id: number): Promise<number> {
    const user = await this.userRepository.scope('notDeleted').findOne({
      where: { id },
    });
    checkUser(user);
    await this.userRepository.destroy({
      where: { id },
    });
    return id;
  }
}
