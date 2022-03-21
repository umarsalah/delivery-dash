import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}
