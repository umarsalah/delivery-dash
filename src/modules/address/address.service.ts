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

  findAddressById(addressId: number): Promise<object> {
    return this.addressesRepository.scope('basic').findOne({
      where: { id: addressId },
    });
  }

  createAddress(address: object, actionUser: object): Promise<Addresses> {
    return this.addressesRepository.create({
      ...address,
      ...actionUser,
    });
  }
}
