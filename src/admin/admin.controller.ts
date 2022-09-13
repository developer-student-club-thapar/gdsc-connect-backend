import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
}
