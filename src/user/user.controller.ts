import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'Returned all user.',
    type: User,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({ description: 'Returned user with ID.', type: User })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findUser(email, false);
  }

  @Patch(':email/tags')
  addTags(@Body() tags: string[], @Param('email') email: string) {
    return this.userService.addTags(email, tags);
  }

  @Patch('changePassword')
  changePassword(
    @Request() req,
    @Body() updatePasswordDto: Omit<UpdatePasswordDto, 'user'>,
  ) {
    return this.userService.changePassword({
      ...updatePasswordDto,
      user: req.user,
    });
  }

  @ApiOkResponse({ description: 'Deleted user with ID.', type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
