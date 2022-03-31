import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isAccepted?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isPaid?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isDelivered?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isPickedup?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isCancelled?: boolean;
}
