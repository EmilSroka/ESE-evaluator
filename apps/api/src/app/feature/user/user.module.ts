import { CacheModule, Logger, Module } from '@nestjs/common';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { UserValidator } from './validators/user.validator';
import { UserGateway } from './gateways/user.gateway';
import { PASSWORD_SERVICE } from './services/password/password.interface';
import { BcryptService } from './services/password/bcrypt.service';
import { UserCacheService } from './services/cache/cache.service';
import { AccessUserService } from './services/access/access.service';
import { UserService } from './user.service';
import { RegisterService } from './services/registration/registration.service';
import { AuthUserService } from './services/auth/auth.service';
import { UserSanitizer } from './validators/user.sanitizer';
import { UpdateUserService } from './services/update/update.service';
import { DbUserModelValidator } from './validators/db-user-model.validator';
import { IdModule } from '../../shared/id/id.module';

const privateFeatureServices = [
  Logger,
  { provide: PASSWORD_SERVICE, useClass: BcryptService },
];

const privateUserServices = [
  DbUserModelValidator,
  AuthUserService,
  RegisterService,
  AccessUserService,
  UpdateUserService,
  UserCacheService,
  UserSanitizer,
  UserValidator,
  UserGateway,
];

const publicServices = [UserService];

@Module({
  imports: [Neo4jModule, CacheModule.register(), IdModule],
  providers: [
    ...publicServices,
    ...privateUserServices,
    ...privateFeatureServices,
  ],
  exports: [...publicServices],
})
export class UserModule {}
