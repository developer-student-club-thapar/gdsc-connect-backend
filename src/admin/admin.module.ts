import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import configuration from 'src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from './schemas/invite-email.schema';

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
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
