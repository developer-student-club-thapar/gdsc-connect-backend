import { ApiProperty } from '@nestjs/swagger';

export class InviteUserDto {
  @ApiProperty()
  email: string;
}
