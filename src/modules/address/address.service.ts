import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { Addresses } from './address.model';

@Injectable()
export class AddressService {
  constructor(
    @Inject(REPOSITORIES.ADDRESSES_REPOSITORY)
    private readonly addressesRepository: typeof Addresses,
  ) {}

  async checkAddress(longitude: number, latitude: number): Promise<number> {
    const address = await this.addressesRepository.findOne({
      where: { longitude, latitude },
    });
    return address?.id;
  }

  findAddressById(addressId: number): Promise<Addresses> {
    return this.addressesRepository.scope('basic').findOne({
      where: { id: addressId },
    });
  }

  createAddress(
    address: object,
    actionUser: object,
    transaction?,
  ): Promise<Addresses> {
    return this.addressesRepository.create(
      {
        ...address,
        ...actionUser,
      },
      { transaction },
    );
  }
  calculateDistance(pickupAddress: any, dropoffAddress: any) {
    const { latitude: pickupLat, longitude: pickupLng } = pickupAddress;
    const { latitude: dropoffLat, longitude: dropoffLng } = dropoffAddress;

    const R = 6371; // Radius of the earth in km
    const dLat = (dropoffLat - pickupLat) * (Math.PI / 180); // deg2rad below
    const dLon = (dropoffLng - pickupLng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pickupLat * (Math.PI / 180)) *
        Math.cos(dropoffLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
}
