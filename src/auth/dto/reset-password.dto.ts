import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty()
    password: string;
    
    @ApiProperty()
    access_token: string;
}
