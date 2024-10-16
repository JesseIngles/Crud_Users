import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/domain/entities/user';
import { AuthService } from 'src/application/services/auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,  
      secretOrKey: 'Mr. English'
    });

  }

  async validate(payload: any) {
    return this.authService.verifyToken(payload); 
  } 
  
}
