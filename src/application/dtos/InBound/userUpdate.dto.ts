// user-update.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/application/dtos/InBound/user.dto';

export class UserUpdateDto {
  @ApiProperty({ description: 'O username do user' })
  userId: number;
  
  @ApiProperty({ description: 'O user' })
  userDto: UserDto;
}
