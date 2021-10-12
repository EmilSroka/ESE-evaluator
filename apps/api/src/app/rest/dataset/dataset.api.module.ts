import { Logger, Module } from '@nestjs/common';
import { UserModule } from '../../feature/user/user.module';
import { AuthModule } from '../../feature/auth/auth.module';
import { DatasetController } from './dataset.controller';
import { DatasetModule } from '../../feature/dataset/dataset.module';

const controllers = [DatasetController];

@Module({
  controllers: [...controllers],
  imports: [UserModule, AuthModule, DatasetModule],
  providers: [Logger],
})
export class DatasetRestApiModule {}
