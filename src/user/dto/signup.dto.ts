import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleStatus } from 'src/common/constants';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

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
}
