import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInParams {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
