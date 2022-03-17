import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

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

  // @Default(new Date())
  @Column({ defaultValue: new Date() })
  createdAt: Date;

  // @Default(new Date())
  @Column({ defaultValue: new Date() })
  updatedAt: Date;

  // @Default('user')
  @Column({ defaultValue: 'user' })
  createdBy: string;

  // @Default('user')
  @Column({ defaultValue: 'user' })
  updatedBy: string;
}
