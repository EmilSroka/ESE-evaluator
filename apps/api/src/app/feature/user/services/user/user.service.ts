import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { from, Observable, of } from 'rxjs';
import { reduce, switchMap, tap } from 'rxjs/operators';
import { UserValidator } from '../../validators/user/user.validator';
import { UserGateway } from '../../gateways/user/user.gateway';
import { User } from '../../models/user.model';
import { Cache } from 'cache-manager';

const CACHE_TTL = 10 /* min */ * 60 * 1000;
const CACHE_KEY_PREFIX = 'email->';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private neo4j: Neo4jProvider,
    private validator: UserValidator,
    private gateway: UserGateway,
    private logger: Logger,
  ) {}

  getByEmail(email: string): Observable<User> {
    return from(this.cacheManager.get(`${CACHE_KEY_PREFIX}${email}`)).pipe(
      switchMap(cache => this.ifCacheEmptyGetFromDb(email, cache)),
      tap(user => this.updateCache(user)),
    );
  }

  private ifCacheEmptyGetFromDb(email: string, cache: any): Observable<User> {
    if (this.validator.isUser(cache)) {
      return of(cache);
    } else {
      return this.getFromDb(email);
    }
  }

  private updateCache(user: User): void {
    of(
      this.cacheManager.set(
        `${CACHE_KEY_PREFIX}${user.email}`,
        user,
        CACHE_TTL,
      ),
    ).subscribe({
      error: () => {
        this.logger.warn(
          `UserService: unable to store user in cache [email = ${user.email}]`,
        );
      },
    });
  }

  private getFromDb(email: string): Observable<User> {
    return this.gateway.getByEmail(email).pipe(
      reduce((_, value) => value, null),
      tap(value => {
        if (!this.validator.isUser(value)) {
          this.logger.log(
            `UserService: requested for non existed user [email = ${email}]`,
          );
          throw new Error(`User with given email (${email}) does not exist`);
        }
      }),
    );
  }
}
