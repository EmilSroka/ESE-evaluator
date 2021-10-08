import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import {
  PASSWORD_SERVICE,
  PasswordService,
} from '../password/password.interface';
import { RegistrationModel, UserBackendModel } from '@ese/api-interfaces';
import { UserValidator } from '../../validators/user.validator';
import { UserGateway } from '../../gateways/user.gateway';
import { UserCacheService } from '../cache/cache.service';
import { UserSanitizer } from '../../validators/user.sanitizer';

@Injectable()
export class RegisterService {
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

  register(user: RegistrationModel): Observable<string> {
    return of(this.sanitizer.registrationSanitization(user)).pipe(
      switchMap(sanitized => this.checkValidity(sanitized)),
      switchMap(sanitized => this.mapToDbFormat(sanitized)),
      switchMap(dbUser => this.gateway.create(dbUser)),
      tap(newUser => this.cache.update(newUser)),
    );
  }

  private checkValidity(
    data: RegistrationModel,
  ): Observable<RegistrationModel> {
    return forkJoin({
      sanitized: of(data),
      isValid: this.validator.canBeRegistered(data),
    }).pipe(map(({ sanitized }) => sanitized));
  }

  private mapToDbFormat(user: RegistrationModel) {
    return this.passwordService.hash(user.password).pipe(
      map<string, UserBackendModel>(hash => {
        const userWithHash: UserBackendModel & RegistrationModel = {
          ...user,
          passwordHash: hash,
        };
        delete userWithHash.password;
        return userWithHash;
      }),
    );
  }
}
