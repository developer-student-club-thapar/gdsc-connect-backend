import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async validatePassword(email: string, password: string,): Promise<User | undefined> {
    const user = await this.userService.findOne(email);
    if (await compare(password, user.password)) {
      return user;
    }
    else {
      throw new BadRequestException('Incorrect Password');
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
