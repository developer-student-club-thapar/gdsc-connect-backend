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
import { GroupGuard } from './guards/group.guard';
import { GroupRole } from './group-action.decorator';
import { GroupUserRole, Role } from 'src/user/schemas/user.schema';
import { addMemberDto } from './dto/add-member.dto';

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

  //update group name
  @Patch('rename-group')
  @GroupRole(GroupUserRole.ADMIN)
  async changeGroupName(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.changeGroupName(updateGroupDto);
  }

  //rename group route
  // @Patch('rename')
  // @GroupRole(GroupUserRole.ADMIN)
  // async changeGroupName(@Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupService.changeGroupName(updateGroupDto);
  // }

  //add member to group route
  @Patch('add-member')
  @GroupRole(GroupUserRole.ADMIN)
  async addMember(@Body() addMemberDto: addMemberDto) {
    return this.groupService.addMember(addMemberDto);
  }

  //delete group route
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
