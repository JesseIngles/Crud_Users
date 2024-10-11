import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  
  @ApiProperty({ description: 'O username do user' })
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @ApiProperty({ description: 'A password do user' })
  @IsString()
  @IsNotEmpty()
  Password: string; 

  @ApiProperty({ description: 'O email do user' })
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @ApiProperty({ description: 'A ocupação do user' })
  @IsNotEmpty()
  Ocupacao: string;
}