import { Table, Model, Column, Default } from 'sequelize-typescript';

@Table({
  tableName: 'Addresses',
  timestamps: false,
  underscored: true,
})
export class Addresses extends Model {
  @Column({
    type: 'int',
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    allowNull: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    allowNull: true,
  })
  street: string;

  @Column({
    type: 'varchar',
    allowNull: true,
  })
  nearestLandmark: string;

  @Column({
    type: 'varchar',
    allowNull: false,
  })
  longitude: string;

  @Column({
    type: 'varchar',
    allowNull: false,
  })
  latitude: string;

  @Default(new Date().toISOString())
  @Column
  createdAt: Date;

  @Default(new Date().toISOString())
  @Column
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
