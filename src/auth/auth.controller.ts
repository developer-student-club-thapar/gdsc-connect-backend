import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/schemas/user.schema';
import { ReqWithUser } from './interfaces/auth-interface.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Send Invite' })
  @Post('invite')
  async invite(@Body() body: any): Promise<any> {
    return this.authService.sendInvite(body.email);
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

  //register route
  @ApiOkResponse({ description: 'Register' })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return this.authService.register(registerUserDto);
  }
}
