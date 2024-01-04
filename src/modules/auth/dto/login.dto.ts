import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  @ApiProperty({ type: String, example: 'bangdd@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is not empty !' })
  @ApiProperty({ type: String, example: '123456789' })
  password: string;
}
