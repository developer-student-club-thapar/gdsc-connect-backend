import { ApiProperty } from "@nestjs/swagger";
import { UserInterface } from "src/auth/interfaces/user-interface.interface";

export class UpdatePasswordDto {
    @ApiProperty()
    oldPassword: string;

    @ApiProperty()
    newPassword: string;

    user: UserInterface
}