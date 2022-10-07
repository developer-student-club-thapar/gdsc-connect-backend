import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import configuration from 'src/config/configuration';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Token, TokenDocument } from './schemas/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperadminService } from 'src/superadmin/superadmin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private superadminService: SuperadminService,
    private mailerService: MailerService,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async validatePassword(email: string, password: string): Promise<User> {
    const user = await this.userService.findUser(email, true);
    if (await compare(password, user.password)) {
      return user;
    } else {
      throw new BadRequestException('Incorrect Password');
    }
  }

  async login(user: User): Promise<any> {
    const payload = { user_id: user._id, type: 'login' };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const invite = await this.superadminService.findInvite(
      registerUserDto.invite_code,
      registerUserDto.email,
    );
    if (invite) {
      delete registerUserDto.invite_code;
      const user = await this.userService.create(registerUserDto);
      return user;
    } else {
      throw new BadRequestException('Invalid Invite or Email');
    }
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const token = await this.tokenModel.findOne({ email: email }).exec();
      if (token) {
        console.log('token already exists', token);
        await token.remove();
        console.log('token removed');
      }
      const user = await this.userService.findUser(email, true);
      if (!user) {
        throw new BadRequestException('No user registered with this email');
      }
      const payload = { user_id: user._id, type: 'password' };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: Date.now() + 1800000,
      });
      const mail = {
        url: `${configuration().app_url}/user/reset-password/${access_token}`,
      };
      await this.mailerService.sendMail({
        to: email,
        subject: 'Forgot Password: GDSC-Connect',
        template: './passwordTemplate',
        context: {
          Mail: mail,
        },
      });
      const newToken = new this.tokenModel({
        email: email,
        access_token: access_token,
      });
      await newToken.save();
      return 'Password Reset link sent';
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User> {
    try {
      const token = await this.tokenModel
        .findOne({ access_token: resetPasswordDto.access_token })
        .exec();
      if (!token) {
        throw new BadRequestException('Invalid Token');
      }
      const payload = this.jwtService.verify(token.access_token);
      const user = await this.userService.findById(payload.user_id);
      await this.userService.resetPassword({
        newPassword: resetPasswordDto.password,
        user,
      });
      await token.remove();
      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }
}
