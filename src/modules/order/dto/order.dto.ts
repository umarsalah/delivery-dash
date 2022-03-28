import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class OrderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isDelivered: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  delivererId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isPickedup: boolean;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsDefined()
  @IsObject()
  @ValidateNested({
    each: true,
  })
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
  @ValidateNested({
    each: true,
  })
  dropoffAddress: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };
}
