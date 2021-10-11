import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Exception } from './exception';
import { Request, Response } from 'express';

@Catch(Exception)
export class RestExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Exception, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { internalMessage, externalMessage, errorCode, validationCodes } =
      exception.payload;
    const httpException = new exception.exceptionType(externalMessage);
    const status = httpException.getStatus();
    const request = ctx.getRequest<Request>();

    this.logger.error(internalMessage, exception.stack);

    const publicPart = {
      message: externalMessage,
      errorCode,
      validationCodes,
    };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: publicPart,
    });
  }
}
