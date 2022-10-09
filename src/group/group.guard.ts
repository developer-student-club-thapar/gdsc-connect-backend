import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/schemas/user.schema';
import { GroupService } from './group.service';

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _groupService: GroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('CALLING GROUP GUARD');
    const groupRole = this._reflector.get<string[]>(
      'group_role',
      context.getHandler(),
    );

    if (!groupRole) {
      return true;
    }

    // get user
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // admin check
    if (groupRole.includes(Role.ADMIN)) {
      try {
        const groupId = request.body.groupId;
        const group = await this._groupService.findOne(groupId);
        // check if user is in the admin list of the group
        if (group.admins.includes(user._id)) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else if (groupRole.includes(Role.MEMBER)) {
      console.log('this is a member');
    }
  }
}
