import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { LocalAuthGuard } from './local-auth-guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'Login', type: Auth })
  @Post('login')
  async login(@Request() req): Promise<any> {
    return req.user;
  }

  @ApiOkResponse({
    description: 'Returned all users.',
    type: Auth,
    isArray: true,
  })
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
