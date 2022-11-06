import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { InviteUserDto } from 'src/superadmin/dto/invite-user.dto';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { ResourceDecorator } from 'src/resource.decorator';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { ActivateGroupDto } from './dto/activate-group.dto';

@ResourceDecorator('super')
@Controller('superadmin')
@UseGuards(SuperAdminGuard)
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  @Post('invite')
  invite(@Body() inviteUserDto: InviteUserDto) {
    return this.superadminService.sendInvite(inviteUserDto);
  }

  @Get('')
  test(@Req() req: ReqWithUser) {
    return req.user;
  }

  @Patch('activateGroup')
  activateGroup(@Body() activateGroupDto: ActivateGroupDto) {
    return this.superadminService.activateGroup(activateGroupDto);
  }
}
