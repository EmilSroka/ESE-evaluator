import { Logger, Module } from '@nestjs/common';
import { AuthModule } from '../../feature/auth/auth.module';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../../feature/user/user.module';

const resolvers = [AuthResolver];

@Module({
  imports: [AuthModule, UserModule],
  providers: [Logger, ...resolvers],
  exports: [...resolvers],
})
export class AuthGqlApiModule {}
