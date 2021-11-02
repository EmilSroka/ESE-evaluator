import { Module } from '@nestjs/common';
import { DatasetInfoResolver } from './dataset-info.resolver';
import { DatasetModule } from '../../feature/dataset/dataset.module';
import { AuthModule } from '../../feature/auth/auth.module';

@Module({
  imports: [DatasetModule, AuthModule],
  providers: [DatasetInfoResolver],
})
export class DatasetGqlApiModule {}
