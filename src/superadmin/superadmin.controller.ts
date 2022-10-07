import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InviteUserDto } from 'src/superadmin/dto/invite-user.dto';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { ResourceDecorator } from 'src/resource.decorator';

@ApiTags('superadmin')
@ApiBearerAuth()
@ResourceDecorator('super')
@Controller('superadmin')
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
