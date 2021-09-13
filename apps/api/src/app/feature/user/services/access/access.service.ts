import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, reduce, tap } from 'rxjs/operators';
import { UserValidator } from '../../validators/user.validator';
import { UserGateway } from '../../gateways/user.gateway';
import { User } from '../../models/user.model';
import { Cache } from 'cache-manager';
import { UserCacheService } from '../cache/cache.service';

@Injectable()
export class AccessUserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private validator: UserValidator,
    private gateway: UserGateway,
    private logger: Logger,
    private cache: UserCacheService,
  ) {}

  getByEmail(email: string): Observable<User> {
    return this.cache.get(email).pipe(
      catchError(() => this.getFromDb(email)),
      tap(user => this.cache.update(user)),
    );
  }

  private getFromDb(email: string): Observable<User> {
    return this.gateway.getByEmail(email).pipe(
      reduce((_, value) => value, null),
      tap(value => {
        if (!this.validator.isUser(value)) {
          this.logger.log(
            `UserService: Unable to find user -> email "${email}" does not exist`,
          );
          throw new UserWithEmailDoesNotExistError(
            `User with given email "${email}" does not exist`,
          );
        }
      }),
    );
  }
}

export class UserWithEmailDoesNotExistError extends Error {}
