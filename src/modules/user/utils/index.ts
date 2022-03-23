import { HttpException, HttpStatus } from '@nestjs/common';

import { Addresses } from 'src/modules/address/address.model';
import { User } from 'src/common/constants';

export const createUserObject = (user: User, address: Addresses) => ({
  user: {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    type: user.type,
    address: {
      street: address.street,
      city: address.city,
      nearestLandmark: address.nearestLandmark,
      longitude: address.longitude,
      latitude: address.latitude,
    },
  },
});

export const checkUser = (user: User) => {
  if (!user) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
