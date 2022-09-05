import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({ description: 'Created new user.', type: Auth })
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @ApiOkResponse({ description: 'Returned all users.', type: Auth, isArray: true })
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiOkResponse({ description: 'Returned user with ID.', type: Auth })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Updated user with ID.', type: Auth })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @ApiOkResponse({ description: 'Deleted user with ID.', type: Auth })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
