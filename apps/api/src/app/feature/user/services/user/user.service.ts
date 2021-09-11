import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { from, Observable, of } from 'rxjs';
import { reduce, switchMap, tap } from 'rxjs/operators';
import { UserValidator } from '../../validators/user/user.validator';
import { UserGateway } from '../../gateways/user/user.gateway';
import { User, UserCreate } from '../../models/user.model';
import { Cache } from 'cache-manager';

const CACHE_TTL = 10 /* min */ * 60 * 1000;
const CACHE_KEY_PREFIX = 'email->';

class UserWithEmailDoesAlreadyExistError extends Error {}
class UserWithEmailDoesNotExistError extends Error {}
class CreatedEntityIsNotOfTypeUser extends Error {}

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

  create(data: UserCreate): Observable<string> {
    return new Observable(subscriber => {
      this.getByEmail(data.email).subscribe({
        error: error => {
          if (error instanceof UserWithEmailDoesNotExistError) {
            this.gateway.create(data).subscribe({
              next: response => {
                if (!this.validator.isUser(response)) {
                  this.logger.log(
                    `UserService: Unable to create user -> created entity is not of type User, entity: ${response}`,
                  );
                  subscriber.error(
                    new CreatedEntityIsNotOfTypeUser(
                      `Created value does not satisfy User type constraints`,
                    ),
                  );
                }
                this.updateCache(response);
                subscriber.next(response.id);
              },
              error: error => {
                this.logger.error(
                  `UserService: Unable to create user -> db error: ${error}`,
                );
                subscriber.error(error);
              },
            });
          } else {
            this.logger.error(
              `UserService: Unable to create user -> when checking email availability, error: ${error}`,
            );
            subscriber.error(error);
          }
        },
        complete: () => {
          this.logger.warn(
            `UserService: Unable to create user -> email already taken, email: ${data.email}`,
          );
          subscriber.error(
            new UserWithEmailDoesAlreadyExistError(
              `Cannot create user because email "${data.email}" is already taken`,
            ),
          );
        },
      });
    });
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
      error: error => {
        this.logger.warn(
          `UserService: Unable to store user in cache -> email: "${user.email}", error: "${error}"`,
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
