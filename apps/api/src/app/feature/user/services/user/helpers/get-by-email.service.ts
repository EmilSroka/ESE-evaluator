import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user.model';
import { reduce, tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { Neo4jProvider } from '../../../../../providers/database/neo4j/provider/neo4j-provider';
import { UserValidator } from '../../../validators/user/user.validator';
import { UserGateway } from '../../../gateways/user/user.gateway';
import { UserWithEmailDoesNotExistError } from '../user.service';

@Injectable()
export class GetByEmailService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private neo4j: Neo4jProvider,
    private validator: UserValidator,
    private gateway: UserGateway,
    private logger: Logger,
  ) {}

  ifCacheEmptyGetFromDb(email: string, cache: any): Observable<User> {
    if (this.validator.isUser(cache)) {
      return of(cache);
    } else {
      return this.getFromDb(email);
    }
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
