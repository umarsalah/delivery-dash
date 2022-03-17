import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

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

  @Column
  type: string;

  @Default(new Date())
  @Column
  createdAt: Date;

  @Default(new Date())
  @Column
  updatedAt: Date;

  @Column
  createBy: string;

  @Column
  updateBy: string;
}
