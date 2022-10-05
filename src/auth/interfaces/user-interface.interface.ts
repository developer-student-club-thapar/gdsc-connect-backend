import { User } from 'src/user/schemas/user.schema';

export type UserInterface = User & { _id: string };
