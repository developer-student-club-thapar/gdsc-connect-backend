import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {
  @ApiProperty()
  @IsString()
  invite_code: string;
}
