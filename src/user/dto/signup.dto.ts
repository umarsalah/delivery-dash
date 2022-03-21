import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { RoleStatus } from 'src/common/constants';

export class SignupDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsString()
  password: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsEnum(RoleStatus, {
    message: 'Type is not valid',
  })
  type: RoleStatus;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  updatedBy: string;

  @IsNotEmpty()
  @IsObject()
  address: {
    longitude: number;
    latitude: number;
  };
}
