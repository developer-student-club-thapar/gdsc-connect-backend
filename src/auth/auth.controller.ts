import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReqWithUser } from './interfaces/auth-interface.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResourceDecorator } from '../resource.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
@ResourceDecorator('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'Login' })
  @Post('login')
  async login(@Request() req: ReqWithUser): Promise<any> {
    return this.authService.login(req.user);
  }

  @Patch('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiOkResponse({ description: 'Register' })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }
}
