import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { UserWithToken } from '../../../graphql/auth/models/user-with-token.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt-payload.model';
import {
  CredentialsModel,
  RegistrationModel,
  UserDbModel,
} from '@ese/api-interfaces';
import { EmailTakenError } from '../../user/services/create/create.service';

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

  register(user: RegistrationModel): Observable<UserWithToken> {
    return this.userService.register(user).pipe(
      catchError(error => {
        if (error instanceof EmailTakenError) {
          throw new ConflictException({
            type: 'registration-01',
            message: `Email ${user.email} is already taken`,
            email: user.email,
          });
        }
        throw new InternalServerErrorException({
          type: 'internal-01',
          message: 'Internal server error',
        });
      }),
      first(),
      switchMap(() => this.userService.getByEmail(user.email)),
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
