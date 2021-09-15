import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import { UserValidator } from '../../validators/user.validator';
import { UserGateway } from '../../gateways/user.gateway';
import { Cache } from 'cache-manager';
import { UserCacheService } from '../cache/cache.service';
import {
  AccessUserService,
  UserWithEmailDoesNotExistError,
} from '../access/access.service';
import { UserBackendModel } from '@ese/api-interfaces';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private validator: UserValidator,
    private gateway: UserGateway,
    private logger: Logger,
    private cache: UserCacheService,
    private access: AccessUserService,
  ) {}

  create(data: UserBackendModel): Observable<string> {
    return new Observable(subscriber => {
      this.access.getByEmail(data.email).subscribe({
        error: error => {
          if (error instanceof UserWithEmailDoesNotExistError) {
            this.gateway.create(data).subscribe({
              next: response => {
                if (!this.validator.isUser(response)) {
                  this.handleWrongType(subscriber, response);
                } else {
                  this.cache.update(response);
                  subscriber.next(response.id);
                }
              },
              error: error => this.handleCreationError(subscriber, error),
            });
          } else {
            this.handleUnexpectedError(subscriber, error);
          }
        },
        complete: () => this.handleEmailTaken(subscriber, data.email),
      });
    });
  }

  handleWrongType(subscriber: Subscriber<string>, response: any) {
    this.logger.log(
      `UserService: Unable to create user -> created entity is not of type User, entity: ${response}`,
    );
    subscriber.error(
      new Error(`Created value does not satisfy User type constraints`),
    );
  }

  handleCreationError(subscriber: Subscriber<string>, error: Error) {
    this.logger.error(
      `UserService: Unable to create user -> db error: ${error}`,
    );
    subscriber.error(error);
  }

  handleUnexpectedError(subscriber: Subscriber<string>, error: Error) {
    this.logger.error(
      `UserService: Unable to create user -> when checking email availability, error: ${error}`,
    );
    subscriber.error(error);
  }

  handleEmailTaken(subscriber: Subscriber<string>, email: string) {
    this.logger.warn(
      `UserService: Unable to create user -> email already taken, email: ${email}`,
    );
    subscriber.error(
      new Error(`Cannot create user because email "${email}" is already taken`),
    );
  }
}
