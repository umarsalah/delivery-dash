import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Addresses } from '../address/address.model';
import { Users } from '../user/user.model';

@Table({
  tableName: 'Orders',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Orders extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  delivererId?: number;

  @ForeignKey(() => Addresses)
  @Column(DataType.INTEGER)
  pickupAddressId: number;

  @ForeignKey(() => Addresses)
  @Column(DataType.INTEGER)
  droppoffAddressId: number;

  @Column(DataType.BOOLEAN)
  isDelivered: boolean;

  @Column(DataType.BOOLEAN)
  isPaid: boolean;

  @Column(DataType.BOOLEAN)
  isPickedup: boolean;

  @Column(DataType.NUMBER)
  totalPrice: number;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;
}
