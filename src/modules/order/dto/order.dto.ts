import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
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
  @IsDefined()
  @IsObject()
  pickupAddress: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };

  @IsNotEmpty()
  @IsDefined()
  @IsObject()
  dropoffAddress: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };
}
