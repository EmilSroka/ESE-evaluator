import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessUserService } from './services/access/access.service';
import { RegisterService } from './services/registration/registration.service';
import { AuthUserService } from './services/auth/auth.service';
import {
  CredentialsModel,
  RegistrationModel,
  UserDbModel,
} from '@ese/api-interfaces';

@Injectable()
export class UserService {
  constructor(
    private access: AccessUserService,
    private registration: RegisterService,
    private auth: AuthUserService,
  ) {}

  getByEmail(email: string): Observable<UserDbModel> {
    return this.access.getByEmail(email);
  }

  register(user: RegistrationModel): Observable<string> {
    return this.registration.register(user);
  }

  verify(credentials: CredentialsModel): Observable<boolean> {
    return this.auth.verify(credentials);
  }
}
