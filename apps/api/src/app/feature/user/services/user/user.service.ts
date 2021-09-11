import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserValidator } from '../../validators/user/user.validator';
import { UserGateway } from '../../gateways/user/user.gateway';
import { User, UserCreate } from '../../models/user.model';
import { Cache } from 'cache-manager';
import { GetByEmailService } from './helpers/get-by-email.service';
import { CreateService } from './helpers/create.service';

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
    private getByEmailHelper: GetByEmailService,
    private createHelper: CreateService,
  ) {}

  getByEmail(email: string): Observable<User> {
    return from(this.cacheManager.get(`${CACHE_KEY_PREFIX}${email}`)).pipe(
      switchMap(cache =>
        this.getByEmailHelper.ifCacheEmptyGetFromDb(email, cache),
      ),
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
                  this.createHelper.handleWrongType(subscriber, response);
                } else {
                  this.updateCache(response);
                  subscriber.next(response.id);
                }
              },
              error: error =>
                this.createHelper.handleCreationError(subscriber, error),
            });
          } else {
            this.createHelper.handleUnexpectedError(subscriber, error);
          }
        },
        complete: () =>
          this.createHelper.handleEmailTaken(subscriber, data.email),
      });
    });
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
}

export class UserWithEmailDoesAlreadyExistError extends Error {}
export class UserWithEmailDoesNotExistError extends Error {}
export class CreatedEntityIsNotOfTypeUser extends Error {}
