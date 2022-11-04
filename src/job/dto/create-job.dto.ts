import { IsArray, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsArray({ each: true })
  tags: string[];

  @IsArray({ each: true })
  eligibility: string[];

  @IsString()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  date_posted: Date;
}
