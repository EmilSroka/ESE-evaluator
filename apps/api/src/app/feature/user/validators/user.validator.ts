import { Injectable } from '@nestjs/common';
import { UserDbModel } from '@ese/api-interfaces';

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
      if (required && keySet.has(key)) return false;
      if (keySet.has(key) && typeof value[key] !== type) return false;
      keySet.delete(key);
    }

    if (keySet.size > 0) return false;

    return value;
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
    key: 'name',
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
];
