import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  Default,
} from 'sequelize-typescript';

import { Users } from '../user/user.model';

@Table({
  tableName: 'Orders',
  timestamps: true,
  underscored: true,
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

  //   @ForeignKey(() => Addresses)
  //   @Column
  //   pickupAddressId: number;

  //   @ForeignKey(() => Addresses)
  //   @Column
  //   droppoffAddressId: number;

  @Column
  isDelivered: boolean;

  @Column
  isPaid: boolean;

  @Column
  isPickedup: boolean;

  @Column
  totalPrice: number;

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
