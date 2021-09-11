import { CacheModule, Logger, Module } from '@nestjs/common';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { UserValidator } from './validators/user/user.validator';
import { UserGateway } from './gateways/user/user.gateway';
import { UserService } from './services/user/user.service';

@Module({
  imports: [Neo4jModule, CacheModule.register()],
  providers: [UserValidator, UserGateway, UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
