import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { Role } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('CALLING SUPERADMIN GUARD');
    const request = context.switchToHttp().getRequest<ReqWithUser>();

    // check if user is superadmin
    if (request.user.role !== Role.SUPER) {
      console.log('SUPERADMIN GUARD: NOT SUPERADMIN');
      return false;
    }
    return true;
  }
}
