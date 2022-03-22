import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { Addresses } from './addresses.model';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(REPOSITORIES.ADDRESSES_REPOSITORY)
    private readonly addressesRepository: typeof Addresses,
  ) {}

  async checkAddress(longitude: number, latitude: number): Promise<number> {
    const address = await this.addressesRepository.findOne({
      where: { longitude, latitude },
    });
    return address.id;
  }
}
