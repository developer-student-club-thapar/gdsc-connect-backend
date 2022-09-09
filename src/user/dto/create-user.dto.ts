import { ApiProperty } from "@nestjs/swagger";

export class NameDto {
  @ApiProperty()
  first: string;

  @ApiProperty()
  last: string;
}

export class SocialsDto {
  @ApiProperty()
  facebook: string;

  @ApiProperty()
  instagram: string;

  @ApiProperty()
  linkedin: string;

  @ApiProperty()
  twitter: string;

  @ApiProperty()
  github: string;
};

export class CreateUserDto {
  @ApiProperty()
  role: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  graduation_batch: number;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  name: NameDto;

  @ApiProperty()
  socials: SocialsDto;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  profile_picture: string;

  @ApiProperty()
  password: string;
}
