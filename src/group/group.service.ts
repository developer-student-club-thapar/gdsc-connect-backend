import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupDocument } from './schema/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addMemberDto } from './dto/add-member.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private readonly userService: UserService,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const group = new this.groupModel();
    group.name = createGroupDto.name;
    group.admins = [createGroupDto.admin];
    group.members = [createGroupDto.admin._id];
    try {
      return await group.save();
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  // changeGroupName
  async changeGroupName(updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel.findById(updateGroupDto.groupId);
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    group.name = updateGroupDto.name;
    await group.save();
    return group;
  }

  findAll() {
    return this.groupModel.find().select('name');
  }

  async findOne(groupId: string) {
    const group = await this.groupModel.findById(groupId).exec();
    if (!group) throw new BadRequestException('No group found with this id');
    return group;
  }

  //addMember
  async addMember(addMemberDto: addMemberDto) {
    const group = await this.groupModel.findById(addMemberDto.groupId);
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    //check if member is already in group
    if (group.members.includes(addMemberDto.memberId)) {
      throw new BadRequestException('Member already in group');
    }
    //findUser from user service
    const user = await this.userService.findById(addMemberDto.memberId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    group.members.push(addMemberDto.memberId);
    await group.save();
    return group;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }

  async findGroupById(groupId: string) {
    const group = await this.groupModel.findById(groupId).exec();
    if (!group) throw new BadRequestException('No group found with this id');
    return group;
  }
}
