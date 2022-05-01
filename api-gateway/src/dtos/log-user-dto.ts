import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
