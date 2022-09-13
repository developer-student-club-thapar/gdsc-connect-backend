import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { ReqWithUser } from '../interfaces/auth-interface.interface';
import { getResourcesFromHandler } from '../resource.decorator';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const whitelistedResources = ['auth', 'app'];

    console.log('CALLING USER GUARD');
    const request: ReqWithUser = context.switchToHttp().getRequest();

    const resource = getResourcesFromHandler(this._reflector, context);

    if (whitelistedResources.includes(resource)) {
      console.log('WHITELISTED RESOURCE SO ALLOWING', resource);
      return true;
    }
  }
}
