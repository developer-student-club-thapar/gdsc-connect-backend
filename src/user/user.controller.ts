import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({
    description: 'Returned all user.',
    type: User,
    isArray: true,
  })

  @ApiOkResponse({ description: 'Get profile', type: User })
  @Get('profile')
  getProfile(@Request() req: ReqWithUser): User {
    return req.user;
  }

  @Patch(':email/tags')
  addTags(@Body() tags: string[], @Param('email') email: string) {
    return this.userService.addTags(email, tags);
  }

  @Patch('update-password')
  updatePassword(
    @Request() req,
    @Body() updatePasswordDto: Omit<UpdatePasswordDto, 'user'>,
  ) {
    return this.userService.updatePassword({
      ...updatePasswordDto,
      user: req.user,
    });
  }
}