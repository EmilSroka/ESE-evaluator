import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserValidator {
  isUser(value: any): value is User {
    if (value == null) return false;
    if (typeof value !== 'object') return false;

    if (typeof value.id !== 'string') return false;
    if (typeof value.email !== 'string') return false;
    if (typeof value.username !== 'string') return false;
    if (typeof value.passwordHash !== 'string') return false;

    return value;
  }
}
