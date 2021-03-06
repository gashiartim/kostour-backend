import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import {
  Exists,
  IsUnique,
  SameAs,
} from '../../../common/decorators/validation.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  @IsUnique(
    'User',
    'users',
    {},
    {
      message: 'That email is taken',
    },
  )
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @Length(6)
  @ApiProperty()
  @SameAs('password_confirm', {
    message: "Password confirmation doesn't match.",
  })
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @Length(6)
  @ApiProperty()
  password_confirm: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  // @Exists(
  //   "Role",
  //   "roles",
  //   {
  //     field: "id",
  //     body_field: "roleId",
  //   },
  //   {
  //     message: "Role with this id doesn't exists",
  //   }
  // )
  // @ApiProperty()
  // roleId: string;
}

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  first_name: string;

  @IsOptional()
  @ApiProperty()
  last_name: string;

  @IsOptional()
  @ApiProperty()
  birthday: Date;

  @IsOptional()
  @ApiProperty()
  phone: string;
}

export class UserRO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  birthday: Date;
  phone: string;
  created_at: Date;
  updated_at: Date;
  is_email_confirmed: boolean;
}
