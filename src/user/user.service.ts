import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    if (await this.userModel.findOne({ email: createUserDto.email }).exec()) {
      throw new BadRequestException('User already exists');
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return { ...user.toObject(), password: undefined };
  }

  async findAll(): Promise<any> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }

  async findOne(email: string, showPassword: boolean): Promise<User> {
    const user = await this.userModel.findOne({ email }).select(showPassword ? '+password' : '').exec();
    if (!user) throw new BadRequestException('No user registered with this email');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
