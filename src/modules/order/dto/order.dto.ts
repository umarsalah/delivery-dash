import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  delivererId: number;

  @IsNotEmpty()
  @IsBoolean()
  isDelivered: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPickedup: boolean;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsObject()
  pickupAddress: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };

  @IsNotEmpty()
  @IsObject()
  dropoffAddress: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
