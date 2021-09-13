import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserValidator } from '../../validators/user/user.validator';
import { from, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

const CACHE_TTL = 10 /* min */ * 60 * 1000;
const CACHE_KEY_PREFIX = 'email->';

@Injectable()
export class UserCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private validator: UserValidator,
    private logger: Logger,
  ) {}

  get(email: string): Observable<User> {
    return from(this.cacheManager.get(`${CACHE_KEY_PREFIX}${email}`)).pipe(
      map<unknown, User>(cache => {
        if (!this.validator.isUser(cache)) {
          this.logger.warn(
            `UserCacheService: Unable to retrieve user from cache -> email: "${email}"`,
          );
          throw new Error(
            `UserCacheService: cache entry for ${email} does not exist`,
          );
        }
        return cache;
      }),
    );
  }

  update(user: User): void {
    of(
      this.cacheManager.set(
        `${CACHE_KEY_PREFIX}${user.email}`,
        user,
        CACHE_TTL,
      ),
    ).subscribe({
      error: error => {
        this.logger.warn(
          `UserCacheService: Unable to store user in cache -> email: "${user.email}", error: "${error}"`,
        );
      },
    });
  }
}
