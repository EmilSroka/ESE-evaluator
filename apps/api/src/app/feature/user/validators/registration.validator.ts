import { Injectable, Logger } from '@nestjs/common';
import { RegistrationModel, ValidationErrors } from '@ese/api-interfaces';
import validator from 'validator';
import { forkJoin, Observable, of } from 'rxjs';
import { AccessUserService } from '../services/access/access.service';
import { catchError, map } from 'rxjs/operators';
import { ExceptionFactory } from '../../errors/exception.factory';

@Injectable()
export class RegistrationValidator {
  constructor(
    private access: AccessUserService,
    private logger: Logger,
    private exceptionFactor: ExceptionFactory,
  ) {}

  canBeRegistered(user: RegistrationModel): Observable<true> {
    const errors = [];

    if (!validator.isEmail(user.email))
      errors.push(ValidationErrors.InvalidEmail);
    if (!this.isUsernameValid(user.username))
      errors.push(ValidationErrors.InvalidUsername);
    if (!this.isPasswordValid(user.password))
      errors.push(ValidationErrors.InvalidPassword);

    return forkJoin({
      isEmailTaken: this.access.getByEmail(user.email).pipe(
        map(() => true),
        catchError(() => of(false)),
      ),
      isUsernameTaken: this.access.getByUsername(user.username).pipe(
        map(() => true),
        catchError(() => of(false)),
      ),
    }).pipe(
      map(({ isEmailTaken, isUsernameTaken }) => {
        if (isEmailTaken) errors.push(ValidationErrors.EmailTaken);
        if (isUsernameTaken) errors.push(ValidationErrors.UsernameTaken);

        if (errors.length > 0) {
          throw this.exceptionFactor.validation({
            place: 'RegistrationValidator#canBeRegistered',
            msg: 'Invalid registration data',
            extra: `"${JSON.stringify(user)}", errors: "${errors}"`,
            codes: errors,
          });
        }

        return true;
      }),
    );
  }

  private isUsernameValid(username: string): boolean {
    return /^[A-Za-z]{1,20}( [A-Za-z]{1,20})?$/.test(username);
  }

  private isPasswordValid(password: string): boolean {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    return /[0-9]/.test(password);
  }
}
