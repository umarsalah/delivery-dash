import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Addresses } from '../addresses/addresses.model';
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
  @Column
  id: number;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Users)
  @Column
  delivererId: number;

  @ForeignKey(() => Addresses)
  @Column
  pickupAddressId: number;

  @ForeignKey(() => Addresses)
  @Column
  droppoffAddressId: number;

  @Column
  isDelivered: boolean;

  @Column
  isPaid: boolean;

  @Column
  isPickedup: boolean;

  @Column
  totalPrice: number;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
