import { Inject, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserCredentials } from '../../models/user.model';
import { AccessUserService } from '../access/access.service';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '../password/password.interface';

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(PASSWORD_SERVICE) private passwordService: PasswordService,
    private access: AccessUserService,
  ) {}

  verify({ email, password }: UserCredentials): Observable<boolean> {
    return this.access.getByEmail(email).pipe(
      switchMap(({ passwordHash }) =>
        this.passwordService.compare(password, passwordHash),
      ),
      catchError(() => of(false)),
    );
  }
}
