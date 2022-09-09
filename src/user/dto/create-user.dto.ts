import { ApiProperty } from "@nestjs/swagger";

export class NameDto {
  @ApiProperty()
  first: string;

  @ApiProperty()
  last: string;
}

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: NameDto;
}
