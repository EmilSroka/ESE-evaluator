import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserDbModel } from '@ese/api-interfaces';
import { ExceptionFactory } from '../../../errors/exception.factory';
import { DbUserModelValidator } from '../../validators/db-user-model.validator';

const CACHE_TTL = 10 /* min */ * 60 * 1000;
const EMAIL_KEY_PREFIX = 'email->';
const USERNAME_TO_EMAIL_KEY_PREFIX = 'username_to_email->';

@Injectable()
export class UserCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private validator: DbUserModelValidator,
    private logger: Logger,
    private exceptionFactory: ExceptionFactory,
  ) {}

  getByEmail(email: string): Observable<UserDbModel> {
    return from(this.cacheManager.get(`${EMAIL_KEY_PREFIX}${email}`)).pipe(
      map<unknown, UserDbModel>(cache => {
        if (!this.validator.isUser(cache)) {
          this.logger.warn(
            `UserCacheService#getByEmail => Unable to retrieve user from cache -> email: "${email}"`,
          );
          throw this.exceptionFactory.internal({
            place: 'UserCacheService#getByEmail',
            msg: 'Unable to retrieve user from cache',
            extra: `email: "${email}"`,
          });
        }
        return cache;
      }),
    );
  }

  getByUsername(username: string): Observable<UserDbModel> {
    return from(
      this.cacheManager.get(`${USERNAME_TO_EMAIL_KEY_PREFIX}${username}`),
    ).pipe(
      switchMap(cache => {
        if (typeof cache !== 'string') {
          this.logger.warn(
            `UserCacheService#getByUsername => Unable to retrieve user from cache -> user: "${username}"`,
          );
          throw this.exceptionFactory.internal({
            place: 'UserCacheService#getByUsername',
            msg: 'Unable to retrieve user from cache',
            extra: `user: "${username}"`,
          });
        }
        return this.getByEmail(cache);
      }),
    );
  }

  update(user: UserDbModel): void {
    from(
      this.cacheManager.set(
        `${USERNAME_TO_EMAIL_KEY_PREFIX}${user.username}`,
        user.email,
        CACHE_TTL,
      ),
    ).subscribe({
      error: error => {
        this.logger.warn(
          `UserCacheService#update => Unable to store username-email mapping in cache -> username: "${user.username}", email: "${user.email}", error: "${error}"`,
        );
      },
    });

    from(
      this.cacheManager.set(
        `${EMAIL_KEY_PREFIX}${user.email}`,
        user,
        CACHE_TTL,
      ),
    ).subscribe({
      error: error => {
        this.logger.warn(
          `UserCacheService#update => Unable to store user in cache -> email: "${user.email}", error: "${error}"`,
        );
      },
    });
  }
}
