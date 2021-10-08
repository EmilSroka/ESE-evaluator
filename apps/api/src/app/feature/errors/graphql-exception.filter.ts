import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Exception } from './exception';

@Catch(Exception)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Exception, host: ArgumentsHost): any {
    const { internalMessage, externalMessage, errorCode, validationCodes } =
      exception.payload;

    this.logger.error(internalMessage, exception.stack);

    const publicPart = {
      message: externalMessage,
      errorCode,
      validationCodes,
    };
    return new exception.exceptionType(JSON.stringify(publicPart));
  }
}
