import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ReqWithUser } from './auth/interfaces/auth-interface.interface';
import { getResourceFromClass } from './resource.decorator';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const whitelistedResources = ['auth', 'app'];

    console.log('CALLING USER GUARD');
    const request: ReqWithUser = context.switchToHttp().getRequest();

    const resource = getResourceFromClass(this._reflector, context);

    if (whitelistedResources.includes(resource)) {
      console.log('WHITELISTED RESOURCE', resource);
      return true;
    }
    // check if bearer token is present
    if (!request.headers['authorization']) {
      console.log('NO AUTHORIZATION HEADER');
      return false;
    }

    // token
    const token = request.headers['authorization'].split(' ')[1];

    // decode token
    let userId = undefined;
    try {
      userId = this.jwtService.verify(token).user_id;
    } catch (e) {
      console.log('INVALID TOKEN');
      return false;
    }
    if (!userId) {
      console.log('NO USER ID IN TOKEN');
      return false;
    }

    const user = await this._userService.findById(userId);

    if (!user) {
      console.log('NO USER FOUND');
      return false;
    } else {
      console.log('USER FOUND');
      request.user = user;
      return true;
    }
  }
}
