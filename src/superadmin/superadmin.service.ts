import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { Invite } from './schemas/invite-email.schema';
import configuration from 'src/config/configuration';
import { ActivateGroupDto } from './dto/activate-group.dto';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class SuperadminService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Invite.name) private InviteModel: Model<Invite>,
    private userService: UserService,
    private groupService: GroupService,
  ) {}

  async sendInvite(inviteUserDto: InviteUserDto) {
    const { email } = inviteUserDto;
    try {
      const user = await this.userService.findUser(email, false);
      throw new BadRequestException('User already exists');
    } catch (error) {
      if (error.name == 'BadRequestException') {
        throw error;
      }
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
  }

  async findInvite(invite_code: string, email: string) {
    const invite = this.InviteModel.findOne({ invite_code, email }).exec();

    if (!invite) {
      throw new BadRequestException('Invalid invite code or Email');
    }
    return invite;
  }

  async activateGroup(activateGroupDto: ActivateGroupDto) {
    const { group_id } = activateGroupDto;
    const group = await this.groupService.findGroupById(group_id);
    if (group) {
      group.isActive = activateGroupDto.isActive;
      await group.save();
      return 'Group activated';
    }
    throw new BadRequestException('No group found with this id');
  }
}
