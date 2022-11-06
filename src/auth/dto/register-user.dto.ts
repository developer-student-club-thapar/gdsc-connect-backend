import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  invite_code: string;
}
