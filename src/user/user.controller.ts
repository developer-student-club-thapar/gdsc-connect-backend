import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ description: 'Created new user.', type: User, isArray: true })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({ description: 'Returned all users.', type: User, isArray: true })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({ description: 'Returned user with ID.', type: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Updated user with ID.', type: User })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOkResponse({ description: 'Deleted user with ID.', type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
