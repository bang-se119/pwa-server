import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty !' })
  @Length(4, 20, { message: 'Length not enought conditon !' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  email: string;

  @IsNotEmpty({ message: 'Email is not empty !' })
  date_of_birth: string;

  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is not empty !' })
  password: string;
}
