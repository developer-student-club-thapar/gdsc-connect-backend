import { IsNotEmpty, IsString } from 'class-validator';

export class ActivateGroupDto {
  @IsString()
  @IsNotEmpty()
  group_id: string;

  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
