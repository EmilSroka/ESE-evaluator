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
import { RegistrationValidator } from '../../validators/registration.validator';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(PASSWORD_SERVICE) private passwordService: PasswordService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: Logger,
    private userValidator: UserValidator,
    private registrationValidator: RegistrationValidator,
    private cache: UserCacheService,
    private gateway: UserGateway,
  ) {}

  register(user: RegistrationModel): Observable<string> {
    return of(this.userValidator.sanitize(user)).pipe(
      switchMap(sanitized => this.checkValidity(sanitized)),
      switchMap(sanitized => this.mapToDbFormat(sanitized)),
      switchMap(dbUser => this.gateway.create(dbUser)),
      tap(newUser => this.cache.update(newUser)),
    );
  }

  private checkValidity(
    data: RegistrationModel,
  ): Observable<RegistrationModel> {
    this.logger.log(String(this.registrationValidator));
    return forkJoin({
      sanitized: of(data),
      isValid: this.registrationValidator.canBeRegistered(data),
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
