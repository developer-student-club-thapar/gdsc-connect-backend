import { ApiProperty } from '@nestjs/swagger';

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
}

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  graduation_batch: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

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

  @ApiProperty()
  gender: string;
}
