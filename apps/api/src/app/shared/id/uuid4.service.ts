import { Injectable } from '@nestjs/common';
import { IdService } from './id-service.interface';
import { v4, validate } from 'uuid';

@Injectable()
export class Uuid4Service implements IdService {
  generate(): string {
    return v4();
  }

  isId(id: string): boolean {
    return validate(id);
  }
}
