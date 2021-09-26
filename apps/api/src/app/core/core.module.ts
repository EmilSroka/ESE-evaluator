import { Global, Logger, Module } from '@nestjs/common';
import { ExceptionFactory } from '../feature/errors/exception.factory';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from '../feature/errors/graphql-exception.filter';

@Global()
@Module({
  providers: [
    Logger,
    ExceptionFactory,
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
  ],
  exports: [ExceptionFactory, Logger],
})
export class CoreModule {}
