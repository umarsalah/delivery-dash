import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Addresses } from 'src/addresses/addresses.model';
import { RoleStatus } from 'src/common/constants';

@Table({
  tableName: 'Users',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Addresses)
  @Column
  addressId: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phoneNumber: string;

  @Column(DataType.ENUM('admin', 'user'))
  type: RoleStatus;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
