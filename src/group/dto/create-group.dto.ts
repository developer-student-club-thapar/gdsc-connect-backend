import { User } from 'src/user/schemas/user.schema';

export class CreateGroupDto {
  //name
  name: string;
  //groupCreator
  groupCreator: User;
}
