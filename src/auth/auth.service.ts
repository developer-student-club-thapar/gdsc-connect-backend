import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserInterface } from './interfaces/user-interface.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async validatePassword(
    email: string,
    password: string,
  ): Promise<UserInterface> {
    const user = await this.userService.findOne(email, true);
    if (await compare(password, user.password)) {
      return user;
    } else {
      throw new BadRequestException('Incorrect Password');
    }
  }

  async login(user: any) {
    const payload = { user_id: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  //register route
  async register(registerUserDto: RegisterUserDto) {
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
}
