import { CacheModule, Logger, Module } from '@nestjs/common';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { UserValidator } from './validators/user/user.validator';
import { UserGateway } from './gateways/user/user.gateway';
import { UserService } from './services/user/user.service';
import { ID_SERVICE } from './services/id/id-service.interface';
import { Uuid4Service } from './services/id/uuid4.service';

@Module({
  imports: [Neo4jModule, CacheModule.register()],
  providers: [
    UserValidator,
    UserGateway,
    UserService,
    Logger,
    { provide: ID_SERVICE, useClass: Uuid4Service },
  ],
  exports: [UserService],
})
export class UserModule {}
