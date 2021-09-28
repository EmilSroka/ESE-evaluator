import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserGateway } from '../../gateways/user.gateway';
import { Cache } from 'cache-manager';
import { UserCacheService } from '../cache/cache.service';
import {
  UserDbModel,
  UserDbUpdateModel,
  UserUpdateModel,
} from '@ese/api-interfaces';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '../password/password.interface';
import { UserValidator } from '../../validators/user.validator';
import { UserSanitizer } from '../../validators/user.sanitizer';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(PASSWORD_SERVICE) private passwordService: PasswordService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: Logger,
    private userValidator: UserValidator,
    private validator: UserValidator,
    private sanitizer: UserSanitizer,
    private cache: UserCacheService,
    private gateway: UserGateway,
  ) {}

  update(email: string, props: UserUpdateModel): Observable<UserDbModel> {
    return of(this.sanitizer.updateSanitization(props)).pipe(
      switchMap(sanitized => this.checkValidity(sanitized)),
      switchMap(sanitized => this.mapToDbFormat(sanitized)),
      switchMap(dbUser => this.gateway.updateUser(email, dbUser)),
      tap(newUser => this.cache.update(newUser)),
    );
  }

  private checkValidity(data: UserUpdateModel): Observable<UserUpdateModel> {
    return forkJoin({
      sanitized: of(data),
      isValid: this.validator.canUpdate(data),
    }).pipe(map(({ sanitized }) => sanitized));
  }

  private mapToDbFormat(user: UserUpdateModel) {
    if (user.password == undefined) return of({ ...user });

    return this.passwordService.hash(user.password).pipe(
      map<string, UserDbUpdateModel>(hash => {
        const userWithHash: UserUpdateModel & UserDbUpdateModel = {
          ...user,
          passwordHash: hash,
        };
        delete userWithHash.password;
        return userWithHash;
      }),
    );
  }
}
