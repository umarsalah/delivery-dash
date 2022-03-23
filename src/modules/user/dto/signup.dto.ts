import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { RoleStatus } from 'src/common/constants';

export class SignupDto {
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  password: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsPhoneNumber('PS')
  phoneNumber: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsEnum(RoleStatus, {
    message: 'Type is not valid',
  })
  type: RoleStatus;

  @IsNotEmpty()
  @IsObject()
  @IsDefined()
  address: {
    city: string;
    street: string;
    neareastLandmark: string;
    longitude: string;
    latitude: string;
  };
}
