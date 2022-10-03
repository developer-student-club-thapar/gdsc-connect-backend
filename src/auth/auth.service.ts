import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { AdminService } from 'src/admin/admin.service';
import { User } from 'src/user/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import configuration from 'src/config/configuration';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private adminService: AdminService,
    private mailerService: MailerService,
  ) { }

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
    const invite = await this.adminService.findInvite(
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
    const user = await this.userService.findUser(email, true);
    if (user) {
      const payload = { user_id: user._id, type: 'password' };
      const access_token = this.jwtService.sign(payload, { expiresIn: Date.now() + 1800000 });
      const mail = {
        url: `${configuration().app_url}/user/reset-password/${access_token}`,
      };
      try {
        await this.mailerService.sendMail({
          to: email,
          subject: 'Forgot Password: GDSC-Connect',
          template: './passwordTemplate',
          context: {
            Mail: mail,
          },
        });
        return 'Password Reset link sent';
      } catch (err) {
        console.log(err);
        throw new BadRequestException(err.message);
      }
    } else {
      throw new BadRequestException('Invalid Email');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User> {
    console.log(resetPasswordDto);
    const user = await this.userService.findUser(resetPasswordDto.user.email, true);
    if (user) {
      await this.userService.resetPassword({
        newPassword: resetPasswordDto.password,
        user,
      });
      return user;
    } else {
      throw new BadRequestException('Invalid Email');
    }
  }
}
