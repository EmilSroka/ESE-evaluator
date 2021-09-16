import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../models/jwt-payload.model';
import { UserService } from '../../user/user.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDbModel } from '@ese/api-interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): Observable<UserDbModel> {
    return this.userService.getByEmail(payload.email).pipe(
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
  }
}
