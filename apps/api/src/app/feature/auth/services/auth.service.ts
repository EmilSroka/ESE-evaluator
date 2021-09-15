import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { UserWithToken } from '../../../graphql/auth/models/user-with-token.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.model';
import { CredentialsModel, UserDbModel } from '@ese/api-interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  login(credentials: CredentialsModel): Observable<UserWithToken> {
    return this.userService.verify(credentials).pipe(
      switchMap(isVerified => {
        if (!isVerified) throw new UnauthorizedException();
        return this.userService.getByEmail(credentials.email);
      }),
      map(user => ({
        user,
        token: this.signToken(user),
      })),
    );
  }

  private signToken(user: UserDbModel) {
    const payload: JwtPayload = { id: user.id, email: user.email };

    return this.jwt.sign(payload);
  }
}
