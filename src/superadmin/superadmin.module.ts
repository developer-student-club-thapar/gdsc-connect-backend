import { Module } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { Invite, InviteSchema } from './schemas/invite-email.schema';
import configuration from 'src/config/configuration';
import { UserModule } from 'src/user/user.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: configuration().invitecreds.host,
          service: configuration().invitecreds.service,
          auth: {
            user: configuration().invitecreds.user,
            pass: configuration().invitecreds.pass,
          },
        },
        template: {
          dir: join(__dirname, 'mails'),
          adapter: new HandlebarsAdapter(),
        },
        defaults: {
          from: configuration().invitecreds.user,
        },
      }),
    }),
    UserModule,
    GroupModule,
  ],
  controllers: [SuperadminController],
  providers: [SuperadminService],
  exports: [SuperadminService],
})
export class SuperadminModule {}
