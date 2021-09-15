import { Logger, Module } from '@nestjs/common';
import { AuthModule } from '../../feature/auth/auth.module';
import { AuthResolver } from './auth.resolver';

const resolvers = [AuthResolver];

@Module({
  imports: [AuthModule],
  providers: [Logger, ...resolvers],
  exports: [...resolvers],
})
export class AuthGqlApiModule {}
