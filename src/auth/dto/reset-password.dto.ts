import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/schemas/user.schema';

export class ResetPasswordDto {
    @ApiProperty()
    password: string;

    user: User;
}
