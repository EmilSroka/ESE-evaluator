import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Exception } from './exception';
import { ValidationErrors } from '@angular/forms';
import { ErrorCodes } from '@ese/api-interfaces';

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
      internalMessage: `${place} => ${msg} -> data: ${extra}`,
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
      internalMessage: `${place} => ${msg} -> data: ${extra}`,
      externalMessage: msg,
      validationCodes: [],
      errorCode: ErrorCodes.Internal,
    });
  }
}
