import { IsBoolean, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  delivererId: number;

  @IsNotEmpty()
  @IsBoolean()
  isDelivred: boolean;

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
  address: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };
}
