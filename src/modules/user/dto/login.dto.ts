import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  email: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  password: string;
}
