import { Injectable } from '@nestjs/common';
import { AddConfigModel } from '@ese/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class ConfigValidator {
  isValid(data: AddConfigModel): Observable<true> {
    // TODO:
    // 1. check if name is not taken
    // 2. check if dataset exists
    // 3. check if seeds <= seeds of dataset model
    // 4. check if categories <= categories of dataset model
    return of(true);
  }
}
