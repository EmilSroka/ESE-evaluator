import { Injectable } from '@nestjs/common';
import { UserDbModel, UserModel } from '@ese/api-interfaces';
import validator from 'validator';

type KeyValidators = {
  key: string;
  required: boolean;
  type: string;
};

@Injectable()
export class UserValidator {
  isUser(value: any): value is UserDbModel {
    if (value == null) return false;
    if (typeof value !== 'object') return false;

    const keySet = new Set(Object.keys(value));

    for (const { key, required, type } of PROPERTIES) {
      if (required && !keySet.has(key)) return false;
      if (keySet.has(key) && typeof value[key] !== type) return false;
      keySet.delete(key);
    }

    if (keySet.size > 0) return false;

    return value;
  }

  sanitize<T extends UserModel>(user: T): T {
    const copy = { ...user };

    for (const key of ['username', 'organization', 'about']) {
      if (copy[key] != null) {
        const trimmed = validator.trim(copy[key]);
        copy[key] = validator.escape(trimmed);
      }
    }

    copy.email = this.sanitizeEmail(copy.email);

    return copy;
  }

  sanitizeEmail(email: string): string {
    const normalized = validator.normalizeEmail(email);
    return normalized ? normalized : email;
  }
}

const PROPERTIES: KeyValidators[] = [
  {
    key: 'id',
    required: true,
    type: 'string',
  },
  {
    key: 'email',
    required: true,
    type: 'string',
  },
  {
    key: 'username',
    required: true,
    type: 'string',
  },
  {
    key: 'passwordHash',
    required: true,
    type: 'string',
  },
  {
    key: 'organization',
    required: false,
    type: 'string',
  },
  {
    key: 'about',
    required: false,
    type: 'string',
  },
];
