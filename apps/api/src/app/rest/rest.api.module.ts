import { Module } from '@nestjs/common';
import { DatasetRestApiModule } from './dataset/dataset.api.module';

const modules = [DatasetRestApiModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class RestApiModule {}
