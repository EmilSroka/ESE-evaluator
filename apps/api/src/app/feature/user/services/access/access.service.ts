import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, reduce, tap } from 'rxjs/operators';
import { UserGateway } from '../../gateways/user.gateway';
import { Cache } from 'cache-manager';
import { UserCacheService } from '../cache/cache.service';
import { UserDbModel } from '@ese/api-interfaces';
import { ExceptionFactory } from '../../../errors/exception.factory';
import { DbUserModelValidator } from '../../validators/db-user-model.validator';

@Injectable()
export class AccessUserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private validator: DbUserModelValidator,
    private gateway: UserGateway,
    private logger: Logger,
    private cache: UserCacheService,
    private exceptionFactory: ExceptionFactory,
  ) {}

  getByEmail(email: string): Observable<UserDbModel> {
    return this.cache.getByEmail(email).pipe(
      catchError(() => this.getFromDbByEmail(email)),
      tap(user => this.cache.update(user)),
    );
  }

  getByUsername(username: string): Observable<UserDbModel> {
    return this.cache.getByUsername(username).pipe(
      catchError(() => this.getFromDbByUsername(username)),
      tap(user => this.cache.update(user)),
    );
  }

  private getFromDbByEmail(email: string): Observable<UserDbModel> {
    return this.gateway.getByEmail(email).pipe(
      reduce((_, value) => value, null),
      tap(value => {
        if (!this.validator.isUser(value)) {
          this.logger.log(
            `AccessUserService#getByEmail => Cannot find user with given email -> email: "${email}"`,
          );
          throw this.exceptionFactory.internal({
            place: 'AccessUserService#getByEmail',
            msg: 'Cannot find user with given email',
            extra: `email: "${email}"`,
          });
        }
      }),
    );
  }

  private getFromDbByUsername(username: string): Observable<UserDbModel> {
    return this.gateway.getByUsername(username).pipe(
      reduce((_, value) => value, null),
      tap(value => {
        if (!this.validator.isUser(value)) {
          this.logger.log(
            `AccessUserService#getByUsername => Cannot find user with given username -> username: "${username}"`,
          );
          throw this.exceptionFactory.internal({
            place: 'AccessUserService#getByUsername',
            msg: 'Cannot find user with given username',
            extra: `username: "${username}"`,
          });
        }
      }),
    );
  }
}
