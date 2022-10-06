import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.userModel.findOne({ email: createUserDto.email }).exec()) {
      throw new BadRequestException('User already exists');
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return {
      ...user.toObject(),
      _id: user._id.toString(),
      password: undefined,
    };
  }

  async findUser(email: string, showPassword: boolean): Promise<User> {
    const user = await this.userModel
      .findOne({ email })
      .select(showPassword ? '+password' : '')
      .exec();

    if (!user)
      throw new BadRequestException('No user registered with this email');
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new BadRequestException('No user found with this id');
    return user;
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<User> {
    if (!updatePasswordDto.user)
      throw new BadRequestException(
        'No updatePasswordDto.user found with this id',
      );
    const user = await this.userModel
      .findById(updatePasswordDto.user._id)
      .select('+password')
      .exec();
    if (!(await compare(updatePasswordDto.oldPassword, user.password)))
      throw new BadRequestException('Old password is incorrect');
    user.password = await hash(updatePasswordDto.newPassword, 10);
    await user.save();

    return {
      ...user.toObject(),
      _id: user._id.toString(),
      password: undefined,
    };
  }

  async resetPassword(
    updatePasswordDto: Omit<UpdatePasswordDto, 'oldPassword'>,
  ): Promise<User> {
    const userData = { ...updatePasswordDto };
    const user = await this.userModel
      .findById(userData.user._id)
      .select('+password')
      .exec();
    if (!user)
      throw new BadRequestException('No user registered with this email');
    user.password = await hash(userData.newPassword, 10);
    await user.save();

    return {
      ...user.toObject(),
      _id: user._id.toString(),
      password: undefined,
    };
  }
}
