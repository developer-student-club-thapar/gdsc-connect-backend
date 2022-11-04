import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => User)
  admin: User;
}
