import type { HttpException } from '@nestjs/common';
import { ValidationErrors } from '@angular/forms';

type Payload = {
  internalMessage: string;
  externalMessage: string;
  errorCode: string;
  validationCodes: ValidationErrors[];
};

type ErrorClass = { new (msg: string): HttpException };

export class Exception<
  E extends ErrorClass = { new (msg: string): HttpException },
> extends Error {
  constructor(public exceptionType: E, public payload: Payload) {
    super();
  }
}
