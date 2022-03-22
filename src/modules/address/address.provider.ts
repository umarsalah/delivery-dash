import { Addresses } from './address.model';

import { REPOSITORIES } from 'src/common/constants';

export const AddressProvider = [
  {
    provide: REPOSITORIES.ADDRESSES_REPOSITORY,
    useValue: Addresses,
  },
];
