import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteJobDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
