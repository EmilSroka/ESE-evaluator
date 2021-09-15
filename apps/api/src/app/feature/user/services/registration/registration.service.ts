import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '../password/password.interface';
import { CreateUserService } from '../create/create.service';
import { RegistrationModel, UserBackendModel } from '@ese/api-interfaces';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(PASSWORD_SERVICE) private passwordService: PasswordService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: Logger,
    private create: CreateUserService,
  ) {}

  register(user: RegistrationModel): Observable<string> {
    return this.passwordService.hash(user.password).pipe(
      catchError(error => {
        this.logger.error(
          'RegisterService: Unable to generate hash -> error: ${error}',
        );
        throw error;
      }),
      map<string, UserBackendModel>(hash => {
        const userWithHash: UserBackendModel & RegistrationModel = {
          ...user,
          passwordHash: hash,
        };
        delete userWithHash.password;
        return userWithHash;
      }),
      switchMap(user => this.create.create(user)),
    );
  }
}
