import { Global, Logger, Module } from '@nestjs/common';
import { ExceptionFactory } from '../feature/errors/exception.factory';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from '../feature/errors/graphql-exception.filter';
import { LocalFileStorageModule } from '../providers/file-storage/local-file-storage/local-file-storage.module';

@Global()
@Module({
  imports: [LocalFileStorageModule.forRoot(process.env.FILE_STORAGE_PATH)],
  providers: [
    Logger,
    ExceptionFactory,
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
  ],
  exports: [ExceptionFactory, Logger, LocalFileStorageModule],
})
export class CoreModule {}
