import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  tableName: 'Addresses',
  timestamps: true,
  underscored: true,
  paranoid: true,
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

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
