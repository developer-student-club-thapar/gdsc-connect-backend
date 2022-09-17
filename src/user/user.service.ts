import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcrypt';
import { UserInterface } from 'src/auth/interfaces/user-interface.interface';
import { compare } from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    if (await this.userModel.findOne({ email: createUserDto.email }).exec()) {
      throw new BadRequestException('User already exists');
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return { ...user.toObject(), _id: user._id.toString(), password: undefined };
  }

  async findAll(): Promise<any> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }

  async findOne(email: string, showPassword: boolean): Promise<UserInterface> {
    const user = await this.userModel
      .findOne({ email })
      .select(showPassword ? '+password' : '')
      .exec();

    const userObj = { ...user.toObject(), _id: user._id.toString() };
    if (!user)
      throw new BadRequestException('No user registered with this email');
    return userObj;
  }

  async addTags(email: string, tags: string[]): Promise<UserInterface> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          { email },
          { $addToSet: { tags: tags } },
          { new: true },
        )
        .exec();
      if (!user)
        throw new BadRequestException('No user registered with this email');
      await user.save();
      return { ...user.toObject(), _id: user._id.toString() };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findById(id: string): Promise<UserInterface> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new BadRequestException('No user found with this id');
    const userObj = { ...user.toObject(), _id: user._id.toString() };
    return userObj;
  }

  async changePassword(
    updatePasswordDto: UpdatePasswordDto
  ): Promise<UserInterface> {
    if (!updatePasswordDto.user) throw new BadRequestException('No updatePasswordDto.user found with this id');
    const user = await this.userModel.findById(updatePasswordDto.user._id).select('+password').exec();
    console.log(user);
    if (!await compare(updatePasswordDto.oldPassword, user.password)) throw new BadRequestException('Old password is incorrect');
    updatePasswordDto.user.password = await hash(updatePasswordDto.newPassword, 10);
    await user.save();
    return { ...user.toObject(), _id: user._id.toString() };
  }
}
