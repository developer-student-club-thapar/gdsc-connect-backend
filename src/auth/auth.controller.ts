import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import configuration from 'src/config/configuration';
import { User } from 'src/user/schemas/user.schema';
import { ReqWithUser } from './auth-interface.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth-guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Send Invite' })
  @Post('invite')
  async invite(@Request() req): Promise<any> {
    return this.authService.sendInvite(req.body.email);
  }

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'Login' })
  @Post('login')
  async login(@Request() req: ReqWithUser): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get profile', type: User })
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }
}
