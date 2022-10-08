import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InviteUserDto } from 'src/superadmin/dto/invite-user.dto';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { ResourceDecorator } from 'src/resource.decorator';
import { SuperAdminGuard } from './super-admin.guard';

@ApiTags('superadmin')
@ApiBearerAuth()
@ResourceDecorator('super')
@Controller('superadmin')
@UseGuards(SuperAdminGuard)
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  @ApiOkResponse({ description: 'Send invite to user' })
  @Post('invite')
  invite(@Body() inviteUserDto: InviteUserDto) {
    return this.superadminService.sendInvite(inviteUserDto);
  }
  @Get('')
  test(@Req() req: ReqWithUser) {
    console.log(req.user);
    return req.user;
  }
}
