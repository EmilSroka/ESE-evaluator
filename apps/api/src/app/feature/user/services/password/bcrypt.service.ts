import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.interface';
import { from, Observable } from 'rxjs';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService implements PasswordService {
  salt = Number(process.env.USER_HASH_SALT);

  hash(password: string): Observable<string> {
    return from(hash(password, this.salt));
  }

  compare(password: string, hash: string): Observable<boolean> {
    return from(compare(password, hash));
  }
}
