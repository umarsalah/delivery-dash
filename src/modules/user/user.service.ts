import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { AddressService } from 'src/modules/address/address.service';

import { REPOSITORIES, ERRORS, User } from '../../common/constants';
import { comparePassword, hashPassword } from 'src/common/utils';
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
  ) {}

  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  async getUserType(userId): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.type;
  }

  // login user
  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    checkUser(user);
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.email),
      type: user.type,
    };
  }

  //  Create User in DB and add address to DB
  async signup(body): Promise<User> {
    const { address, ...userObj } = body;
    let addedAddress: number;

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
      // use transaction to add user and address

      const transaction = await this.userRepository.sequelize.transaction();
      try {
        if (!addressId) {
          const newAddress = await this.addressService.createAddress(
            address,
            {
              createdBy: userObj.email,
              updatedBy: userObj.email,
            },
            transaction,
          );
          addedAddress = newAddress.id;
        } else {
          addedAddress = addressId;
        }

        const userFromDB = await this.userRepository.create(
          {
            ...userObj,
            addressId: addedAddress,
            createdBy: userObj.email,
            updatedBy: userObj.email,
          },
          { transaction },
        );

        return {
          id: userFromDB.id,
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          email: userObj.email,
          type: userObj.type,
        };
      } catch (error) {
        await transaction.rollback();
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      } finally {
        await transaction.commit();
      }
    }
  }

  // Get All Users from DB
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.scope('basic').findAll();
    return users;
  }

  // Get User By id param from DB
  async getUserById(id: number): Promise<object> {
    const user = await this.userRepository.scope('basic').findOne({
      where: { id },
    });
    if (user) {
      const address = await this.addressService.findAddressById(user.addressId);
      return createUserObject(user, address);
    }
    return null;
  }

  // Delete User By id param from DB
  async deleteUserById(id: number): Promise<number> {
    const user = await this.userRepository.scope('basic').findOne({
      where: { id },
    });
    checkUser(user);
    await this.userRepository.destroy({
      where: { id },
    });
    return id;
  }
}
