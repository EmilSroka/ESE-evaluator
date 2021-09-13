import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserRegister } from './models/user.model';
import { AccessUserService } from './services/access/access.service';
import { RegisterService } from './services/registration/registration.service';

@Injectable()
export class UserService {
  constructor(
    private access: AccessUserService,
    private registration: RegisterService,
  ) {}

  getByEmail(email: string): Observable<User> {
    return this.access.getByEmail(email);
  }

  register(user: UserRegister): Observable<string> {
    return this.registration.register(user);
  }
}
