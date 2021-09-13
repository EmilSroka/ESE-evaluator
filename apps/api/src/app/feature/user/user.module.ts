import { CacheModule, Logger, Module } from '@nestjs/common';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { UserValidator } from './validators/user.validator';
import { UserGateway } from './gateways/user.gateway';
import { ID_SERVICE } from './services/id/id-service.interface';
import { Uuid4Service } from './services/id/uuid4.service';
import { PASSWORD_SERVICE } from './services/password/password.interface';
import { BcryptService } from './services/password/bcrypt.service';
import { UserCacheService } from './services/cache/cache.service';
import { AccessUserService } from './services/access/access.service';
import { CreateUserService } from './services/create/create.service';
import { UserService } from './user.service';
import { RegisterService } from './services/registration/registration.service';
import { AuthUserService } from './services/auth/auth.service';

const privateFeatureServices = [
  Logger,
  { provide: ID_SERVICE, useClass: Uuid4Service },
  { provide: PASSWORD_SERVICE, useClass: BcryptService },
];

const privateUserServices = [
  AuthUserService,
  RegisterService,
  AccessUserService,
  UserCacheService,
  CreateUserService,
  UserValidator,
  UserGateway,
];

const publicServices = [UserService];

@Module({
  imports: [Neo4jModule, CacheModule.register()],
  providers: [
    ...publicServices,
    ...privateUserServices,
    ...privateFeatureServices,
  ],
  exports: [...publicServices],
})
export class UserModule {}
