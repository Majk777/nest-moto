import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from '@nestjs/common';

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_R_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayload): JwtPayloadRt {
    console.log('RT JWT Payload:', payload);
    const authorizationHeader = req.headers['authorization'] as unknown;
    if (typeof authorizationHeader !== 'string' || !authorizationHeader) {
      throw new Error('authorization Header is missing or invalid');
    }
    const refreshToken = authorizationHeader.replace('Bearer', '').trim();
    return { ...payload, refreshToken }; // zwraca payload i refresh token
  }
}
