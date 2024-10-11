import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/application/dtos/InBound/user.dto';

export class UserDeleteDto {
  @ApiProperty({ description: 'O id do user' })
  userId: number;
  
}
