import { Injectable } from '@nestjs/common';
import { UserDbModel } from '@ese/api-interfaces';
import { DB_MODEL_PROPERTIES, USER_PROPERTIES } from './user.properties';

@Injectable()
export class DbUserModelValidator {
  isUser(value: any): value is UserDbModel {
    if (value == null) return false;
    if (typeof value !== 'object') return false;

    const keySet = new Set(Object.keys(value));

    for (const key of DB_MODEL_PROPERTIES) {
      const { required, type } = USER_PROPERTIES[key];
      if (required && !keySet.has(key)) return false;
      if (keySet.has(key) && typeof value[key] !== type) return false;
      keySet.delete(key);
    }

    if (keySet.size > 0) return false;

    return value;
  }
}
