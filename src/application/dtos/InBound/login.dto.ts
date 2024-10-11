import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'O username ou email do user' })
  @IsString()
  @IsNotEmpty()
  userNameOrEmail: string;

  @ApiProperty({ description: 'Password do user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
