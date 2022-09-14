import { UserInterface } from './user-interface.interface';

export type ReqWithUser = Request & { user: UserInterface };
