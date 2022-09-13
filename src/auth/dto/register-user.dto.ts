import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {
  invite_code: string;
}
