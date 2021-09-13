import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserCreate, UserRegister } from '../../models/user.model';
import { Cache } from 'cache-manager';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '../password/password.interface';
import { CreateUserService } from '../create/create.service';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(PASSWORD_SERVICE) private passwordService: PasswordService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: Logger,
    private create: CreateUserService,
  ) {}

  register(user: UserRegister): Observable<string> {
    return this.passwordService.hash(user.password).pipe(
      catchError(error => {
        this.logger.error(
          'RegisterService: Unable to generate hash -> error: ${error}',
        );
        throw error;
      }),
      map<string, UserCreate>(hash => {
        const userWithHash: UserCreate & UserRegister = {
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
