import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import configuration from 'src/config/configuration';
import { AdminModule } from 'src/admin/admin.module';
import { Token, TokenSchema } from './schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: configuration().jwtConfig.secret,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
