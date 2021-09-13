import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserCredentials, UserRegister } from './models/user.model';
import { AccessUserService } from './services/access/access.service';
import { RegisterService } from './services/registration/registration.service';
import { AuthUserService } from './services/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private access: AccessUserService,
    private registration: RegisterService,
    private auth: AuthUserService,
  ) {}

  getByEmail(email: string): Observable<User> {
    return this.access.getByEmail(email);
  }

  register(user: UserRegister): Observable<string> {
    return this.registration.register(user);
  }

  verify(credentials: UserCredentials): Observable<boolean> {
    return this.auth.verify(credentials);
  }
}
