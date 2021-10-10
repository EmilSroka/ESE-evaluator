import { Module } from '@nestjs/common';
import { DatasetValidator } from './validator/dataset.validator';

@Module({
  providers: [DatasetValidator],
  exports: [DatasetValidator],
})
export class DatasetModule {}
