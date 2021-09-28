import { Logger, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserModule } from '../../feature/user/user.module';
import { AuthModule } from '../../feature/auth/auth.module';

const resolvers = [UserResolver];

@Module({
  imports: [UserModule, AuthModule],
  providers: [Logger, ...resolvers],
  exports: [...resolvers],
})
export class UserGqlApiModule {}
