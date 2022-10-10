import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { Role } from 'src/user/schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('CALLING ADMIN GUARD');
    const request = context.switchToHttp().getRequest<ReqWithUser>();

    // check if user is superadmin
    if (request.user.role !== Role.ADMIN) {
      console.log('ADMIN GUARD: NOT ADMIN');
      return false;
    }
    return true;
  }
}
