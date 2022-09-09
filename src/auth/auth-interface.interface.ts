import { User } from "src/user/schemas/user.schema";

export type ReqWithUser = Request & { user: User };