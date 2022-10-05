import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import configuration from 'src/config/configuration';
import { InviteUserDto } from './dto/invite-user.dto';
import { Invite } from './schemas/invite-email.schema';

@Injectable()
export class AdminService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Invite.name) private InviteModel: Model<Invite>,
  ) {}

  async sendInvite(inviteUserDto: InviteUserDto) {
    const invite_code = Math.random().toString(36).substring(2, 10);
    const invite = new this.InviteModel({
      email: inviteUserDto.email,
      invite_code,
    });
    await invite.save();
    const mail = {
      invite: invite_code,
      url: `${configuration().app_url}/auth/register/${invite_code}`,
    };
    try {
      await this.mailerService.sendMail({
        to: `${inviteUserDto.email}`,
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

  async findInvite(invite_code: string, email: string) {
    const invite = this.InviteModel.findOne({ invite_code, email }).exec();

    if (!invite) {
      throw new BadRequestException('Invalid invite code or Email');
    }
    return invite;
  }
}
