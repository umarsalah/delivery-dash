import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Scopes,
} from 'sequelize-typescript';

@Scopes(() => ({
  basic: {
    attributes: {
      exclude: [
        'deletedAt',
        'createdAt',
        'updatedAt',
        'createdBy',
        'updatedBy',
      ],
    },
  },
}))
@Table({
  tableName: 'Addresses',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Addresses extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  street: string;

  @Column(DataType.STRING)
  nearestLandmark: string;

  @Column(DataType.STRING)
  longitude: string;

  @Column(DataType.STRING)
  latitude: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;
}
