import { IsNotEmpty, IsString } from 'class-validator';

export class addMemberDto {
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  memberId: string;
}
