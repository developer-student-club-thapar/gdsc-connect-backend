import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SocialsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  facebook: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  instagram: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  linkedin: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  twitter: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  github: string;
}

export class CreateUserDto extends SocialsDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNumber()
  graduation_batch: number;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  resume: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  profile_picture: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  gender: string;
}
