import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { AdminService } from './admin.service';
import { InviteUserDto } from './dto/invite-user.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOkResponse({ description: 'Send invite to user' })
  @Post('invite')
  invite(@Body() inviteUserDto: InviteUserDto) {
    return this.adminService.sendInvite(inviteUserDto);
  }
  @Get('')
  test(@Req() req: ReqWithUser) {
    console.log(req.user);
    return req.user;
  }
}
