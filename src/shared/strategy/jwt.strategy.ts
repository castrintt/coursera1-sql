import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AUTH_COOKIE_NAMES } from 'src/shared/constants/auth-cookies';

function extractJwtFromRequest(req: Request): string | null {
  const authorization = req.headers.authorization;
  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice(7);
  }
  const accessToken = req.cookies?.[AUTH_COOKIE_NAMES.accessToken];
  return typeof accessToken === 'string' ? accessToken : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: extractJwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: { sub: string; email: string; type: string }) {
    if (payload.type !== 'access') {
      return null;
    }
    return { userId: payload.sub, email: payload.email };
  }
}
