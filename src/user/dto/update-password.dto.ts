import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class UpdatePasswordDto {
  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  newPassword: string;

  user: User;
}
