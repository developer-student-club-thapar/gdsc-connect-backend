import { Controller, Get, Body, Patch, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req: ReqWithUser): User {
    return req.user;
  }

  @Patch('update-password')
  updatePassword(
    @Request() req: ReqWithUser,
    @Body() updatePasswordDto: Omit<UpdatePasswordDto, 'user'>,
  ) {
    return this.userService.updatePassword({
      ...updatePasswordDto,
      user: req.user,
    });
  }
}
