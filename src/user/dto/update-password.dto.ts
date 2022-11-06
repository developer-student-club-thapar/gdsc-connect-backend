import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../schemas/user.schema';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @Type(() => User)
  @IsNotEmpty()
  user: User;
}
