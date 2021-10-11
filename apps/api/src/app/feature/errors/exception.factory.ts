import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Exception } from './exception';
import { ErrorCodes, ValidationErrors } from '@ese/api-interfaces';

@Injectable()
export class ExceptionFactory {
  validation({
    place,
    msg,
    extra,
    codes,
  }: {
    place: string;
    msg: string;
    extra: string;
    codes: ValidationErrors[];
  }): Exception {
    return new Exception(BadRequestException, {
      internalMessage: `${place} => ${msg} -> ${extra}`,
      externalMessage: msg,
      validationCodes: codes,
      errorCode: ErrorCodes.Validation,
    });
  }

  internal({
    place,
    msg,
    extra,
  }: {
    place: string;
    msg: string;
    extra: string;
  }): Exception {
    return new Exception(InternalServerErrorException, {
      internalMessage: `${place} => ${msg} -> ${extra}`,
      externalMessage: 'Internal error',
      validationCodes: [],
      errorCode: ErrorCodes.Internal,
    });
  }
}
