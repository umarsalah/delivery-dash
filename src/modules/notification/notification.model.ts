import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { Orders } from '../order/order.model';
import { Users } from '../user/user.model';

@Table({
  tableName: 'Notifications',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Notification extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Orders)
  @Column(DataType.STRING)
  orderId: number;

  @Column(DataType.STRING)
  message: string;

  @Column(DataType.BOOLEAN)
  isRead: boolean;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
