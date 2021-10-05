import { Logger, Module } from '@nestjs/common';
import { UserModule } from '../../feature/user/user.module';
import { AuthModule } from '../../feature/auth/auth.module';
import { DatasetController } from './dataset.controller';

const controllers = [DatasetController];

@Module({
  controllers: [...controllers],
  imports: [UserModule, AuthModule],
  providers: [Logger],
})
export class DatasetRestApiModule {}
