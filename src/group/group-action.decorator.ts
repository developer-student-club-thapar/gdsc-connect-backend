import { SetMetadata } from '@nestjs/common';

export const GroupRole = (...roles: string[]) =>
  SetMetadata('group_role', roles);
