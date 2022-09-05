import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ChatModule } from './chat/chat.module';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [AuthModule, UserModule, JobModule, ChatModule, UtilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
