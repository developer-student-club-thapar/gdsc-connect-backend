import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ChatModule } from './chat/chat.module';
import { UtilityModule } from './utility/utility.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UserGuard } from './user.guard';
import { JwtModule } from '@nestjs/jwt';
import { SuperadminModule } from './superadmin/superadmin.module';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';
import { EventsGateway } from './message/message.gateway';
import configuration from './config/configuration';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: configuration().jwtConfig.secret,
        signOptions: { expiresIn: configuration().jwtConfig.timeout },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().dbConfig.mongo_url),
    AuthModule,
    UserModule,
    JobModule,
    ChatModule,
    UtilityModule,
    AdminModule,
    SuperadminModule,
    GroupModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: UserGuard,
    },
    AppService,
    EventsGateway,
  ],
})
export class AppModule {}
