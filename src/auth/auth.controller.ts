import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReqWithUser } from './interfaces/auth-interface.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResourceDecorator } from '../resource.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserLoginDto } from './dto/user-login.dto';
import { Token } from './schemas/token.schema';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
@ResourceDecorator('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'Returns user auth token',
    type: Token,
  })
  @Post('login')
  async login(
    @Request() req: ReqWithUser,
    @Body() creds: UserLoginDto,
  ): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    description: 'Sent email with reset password link',
    type: String,
  })
  @Patch('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @ApiOkResponse({
    description: 'Password reset successfully',
    type: User,
  })
  @Patch('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiOkResponse({
    description: 'New user registered',
    type: User,
  })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }
}
