import { Addresses } from './addresses.model';

import { REPOSITORIES } from 'src/common/constants';

export const AddressesProvider = [
  {
    provide: REPOSITORIES.ADDRESSES_REPOSITORY,
    useValue: Addresses,
  },
];
