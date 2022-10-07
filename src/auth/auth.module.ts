import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Token, TokenSchema } from './schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperadminModule } from 'src/superadmin/superadmin.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    UserModule,
    SuperadminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: configuration().jwtConfig.secret,
        signOptions: { expiresIn: configuration().jwtConfig.timeout },
      }),
    }),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
