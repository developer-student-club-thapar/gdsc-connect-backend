import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from 'src/auth/schemas/inv_email.schema';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Invite.name)
    private InviteModel: Model<InviteDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validatePassword(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findOne(email, true);
    if (await compare(password, user.password)) {
      return user;
    } else {
      throw new BadRequestException('Incorrect Password');
    }
  }

  async login(user: User) {
    const payload = { useremail: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async sendInvite(email: string) {
    const invitecode = Math.random().toString(36).substring(2, 10);
    const invite = new this.InviteModel({ email, invitecode });
    await invite.save();
    const mail = {
      invite: invitecode,
      url: `http://localhost:3000/auth/register/${invitecode}`,
    };
    try {
      await this.mailerService.sendMail({
        to: `${email}`,
        subject: 'Invite code for gdsc-connect',
        template: './inviteTemplate',
        context: {
          Mail: mail,
        },
      });
      return 'Invite sent';
    } catch (err) {
      console.log(err);
    }
  }
}
