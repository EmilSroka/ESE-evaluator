import { Injectable } from '@nestjs/common';
import { RegistrationModel, UserUpdateModel } from '@ese/api-interfaces';
import {
  REGISTRATION_PROPERTIES,
  UPDATE_PROPERTIES,
  USER_PROPERTIES,
} from './user.properties';

@Injectable()
export class UserSanitizer {
  updateSanitization(user: UserUpdateModel): UserUpdateModel {
    return this.objectSanitization(user, UPDATE_PROPERTIES);
  }

  registrationSanitization(user: RegistrationModel): RegistrationModel {
    return this.objectSanitization(user, REGISTRATION_PROPERTIES);
  }

  private objectSanitization<T>(object: T, keys: string[]): T {
    const copy = { ...object };
    for (const key of keys) {
      if (copy[key] != undefined) {
        copy[key] = this.fieldSanitization(key, copy[key]);
      }
    }
    return copy;
  }

  fieldSanitization<T>(key: string, input: T): T {
    const { sanitizer } = USER_PROPERTIES[key] ?? {};
    if (sanitizer == undefined) return input;
    return sanitizer(input);
  }
}
