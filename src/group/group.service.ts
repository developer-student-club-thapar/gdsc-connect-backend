import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
//import group schema
import { Group, GroupDocument } from './schema/group.schema';
// import inject model
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import groupmodule

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const group = await this.groupModel.create(createGroupDto);
    return group;
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}