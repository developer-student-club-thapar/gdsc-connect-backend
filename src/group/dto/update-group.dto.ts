import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsString()
  groupId: string;
  @IsString()
  name: string;
}
