import { Observable } from 'rxjs';

export const PASSWORD_SERVICE = 'PASSWORD SERVICE';

export interface PasswordService {
  hash(password: string): Observable<string>;
  compare(password: string, hash: string): Observable<boolean>;
}
