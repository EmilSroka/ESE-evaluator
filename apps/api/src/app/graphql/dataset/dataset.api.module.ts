import { Module } from '@nestjs/common';
import { DatasetInfoResolver } from './dataset-info.resolver';
import { DatasetModule } from '../../feature/dataset/dataset.module';

@Module({
  imports: [DatasetModule],
  providers: [DatasetInfoResolver],
})
export class DatasetGqlApiModule {}
