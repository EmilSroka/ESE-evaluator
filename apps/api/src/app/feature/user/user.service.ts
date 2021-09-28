import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessUserService } from './services/access/access.service';
import { RegisterService } from './services/registration/registration.service';
import { AuthUserService } from './services/auth/auth.service';
import {
  CredentialsModel,
  RegistrationModel,
  UserDbModel,
  UserUpdateModel,
} from '@ese/api-interfaces';
import { UpdateUserService } from './services/update/update.service';

@Injectable()
export class UserService {
  constructor(
    private access: AccessUserService,
    private updateService: UpdateUserService,
    private registration: RegisterService,
    private auth: AuthUserService,
  ) {}

  getByUsername(username: string): Observable<UserDbModel> {
    return this.access.getByUsername(username);
  }

  getByEmail(email: string): Observable<UserDbModel> {
    return this.access.getByEmail(email);
  }

  update(email: string, data: UserUpdateModel): Observable<UserDbModel> {
    return this.updateService.update(email, data);
  }

  register(user: RegistrationModel): Observable<string> {
    return this.registration.register(user);
  }

  verify(credentials: CredentialsModel): Observable<boolean> {
    return this.auth.verify(credentials);
  }
}
