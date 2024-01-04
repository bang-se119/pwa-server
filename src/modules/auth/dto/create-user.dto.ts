import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty !' })
  @Length(1, 20, { message: 'Length not enought conditon !' })
  @ApiProperty({ type: String, example: 'pwa' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  @ApiProperty({ type: String, example: 'pwa@gmail.com' })
  email: string;

  @IsNotEmpty({ message: 'Date of birth is not empty !' })
  @ApiProperty({ type: String, example: '2001-01-01' })
  date_of_birth: string;

  @IsString()
  @ApiProperty({ type: String, example: '0987654321' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not empty !' })
  @ApiProperty({ type: String, example: '12345678' })
  password: string;
}
