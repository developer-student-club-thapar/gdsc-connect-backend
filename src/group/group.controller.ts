import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Post()
  create(
    @Req() req: ReqWithUser,
    @Body() createGroupDto: Omit<CreateGroupDto, 'groupCreator'>,
  ) {
    return this.groupService.create({
      ...createGroupDto,
      groupCreator: req.user,
    });
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  //change group name endpoint with group id in body
  @Patch('rename')
  async changeGroupName(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.changeGroupName(updateGroupDto.id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
