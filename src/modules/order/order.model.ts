import {
  Model,
  Table,
  Scopes,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Addresses } from '../address/address.model';
import { Users } from '../user/user.model';

@Scopes(() => ({
  basic: {
    attributes: {
      exclude: [
        'deletedAt',
        'password',
        'createdAt',
        'updatedAt',
        'createdBy',
        'updatedBy',
      ],
    },
  },
}))
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
  delivererId: number;

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

  @Column(DataType.BOOLEAN)
  isCancelled: boolean;

  @Column(DataType.NUMBER)
  totalPrice: number;

  @Column(DataType.STRING)
  createdBy: number;

  @Column(DataType.STRING)
  updatedBy: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.VIRTUAL(DataType.BOOLEAN))
  get isAccepted() {
    return !!this.delivererId;
  }
}
