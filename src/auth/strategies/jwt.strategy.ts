import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import configuration from 'src/config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwtConfig.secret,
      userIdField: 'user_id',
    });
  }

  async validate(payload: any) {
    if (payload.type !== 'password') {
      throw new UnauthorizedException('Invalid Token');
    }
    return payload;
  }
}
