import { Injectable, Logger } from '@nestjs/common';
import {
  RegistrationModel,
  UserUpdateModel,
  ValidationErrors,
} from '@ese/api-interfaces';
import { forkJoin, Observable, of } from 'rxjs';
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
} from '@ese/validators';
import { catchError, map } from 'rxjs/operators';
import { AccessUserService } from '../services/access/access.service';
import { ExceptionFactory } from '../../errors/exception.factory';

@Injectable()
export class UserValidator {
  constructor(
    private access: AccessUserService,
    private logger: Logger,
    private exceptionFactor: ExceptionFactory,
  ) {}

  canUpdate(user: UserUpdateModel): Observable<true> {
    const handleError = (): true => {
      if (errors.length > 0) {
        throw this.exceptionFactor.validation({
          place: 'UserValidator#canUpdate',
          msg: 'Invalid update data',
          extra: `user: "${JSON.stringify(user)}", errors: "${errors}"`,
          codes: errors,
        });
      }

      return true;
    };

    const errors = [];

    if (user.username != undefined && !isUsernameValid(user.username))
      errors.push(ValidationErrors.InvalidUsername);
    if (user.password != undefined && !isPasswordValid(user.password))
      errors.push(ValidationErrors.InvalidPassword);

    if (user.username == undefined)
      of('NO MATTER').pipe(map(() => handleError()));

    return this.access
      .getByUsername(user.username)
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      )
      .pipe(
        map(isUsernameTaken => {
          if (isUsernameTaken) errors.push(ValidationErrors.UsernameTaken);

          return handleError();
        }),
      );
  }

  canBeRegistered(user: RegistrationModel): Observable<true> {
    const errors = [];

    if (!isEmailValid(user.email)) errors.push(ValidationErrors.InvalidEmail);
    if (!isUsernameValid(user.username))
      errors.push(ValidationErrors.InvalidUsername);
    if (!isPasswordValid(user.password))
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
            place: 'UserValidator#canBeRegistered',
            msg: 'Invalid registration data',
            extra: `user: "${JSON.stringify(user)}", errors: "${errors}"`,
            codes: errors,
          });
        }

        return true;
      }),
    );
  }
}
