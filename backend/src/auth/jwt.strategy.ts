import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'codex-secret-key',
    });
  }

  async validate(payload: any) {
    let user = await this.usersService.findById(payload.sub);
    if (!user && payload.email) {
      user = await this.usersService.findByEmail(payload.email);
    }
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
