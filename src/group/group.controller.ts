import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { GroupGuard } from './group.guard';
import { GroupRole } from './group-action.decorator';
import { Role } from 'src/user/schemas/user.schema';

@UseGuards(GroupGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Post()
  create(
    @Req() req: ReqWithUser,
    @Body() createGroupDto: Omit<CreateGroupDto, 'admin'>,
  ) {
    return this.groupService.create({
      ...createGroupDto,
      admin: req.user,
    });
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  //change group name endpoint with group id in body
  @Patch('rename')
  @GroupRole(Role.ADMIN)
  async changeGroupName(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.changeGroupName(updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
