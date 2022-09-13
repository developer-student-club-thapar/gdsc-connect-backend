import { UserInterface } from './user-interface.interface';

export type ReqWithUser = Request & { token: string; user: UserInterface };
