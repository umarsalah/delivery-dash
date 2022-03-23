export const DATABASE_CONFIG = 'database';

export const PROVIDERS = {
  DATABASE_PROVIDER: 'DbConnection',
};
export const REPOSITORIES = {
  USER_REPOSITORY: 'USER_REPOSITORY',
  ORDERS_REPOSITORY: 'ORDERS_REPOSITORY',
  ADDRESSES_REPOSITORY: 'Addresses_REPOSITORY',
};

export enum RoleStatus {
  ADMIN = 'admin',
  USER = 'user',
  DELIVERY = 'delivery',
}

export const ERRORS = {
  LOGIN_ERROR: 'Email or password is incorrect',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXIST: 'User already exist',
  USER_NOT_AUTHORIZED: 'User not authorized',
};

export type UserObject = {
  user: string;
  email: string;
  token: string;
  type: RoleStatus;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
};
