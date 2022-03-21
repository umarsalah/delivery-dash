import {
  Table,
  Column,
  Model,
  Default,
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

  @Default(new Date())
  @Column
  createdAt: Date;

  @Default(new Date())
  @Column
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
