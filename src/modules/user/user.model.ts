import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Addresses } from 'src/modules/address/address.model';
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
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Addresses)
  @Column(DataType.INTEGER)
  addressId: number;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  phoneNumber: string;

  @Column(DataType.ENUM(RoleStatus.ADMIN, RoleStatus.USER, RoleStatus.DELIVERY))
  type: RoleStatus;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;
}
