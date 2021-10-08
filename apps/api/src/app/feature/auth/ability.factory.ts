import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { UserDbModel } from '@ese/api-interfaces';

class User implements UserDbModel {
  about: string;
  email: string;
  id: string;
  organization: string;
  passwordHash: string;
  username: string;
}

export function wrapUser(dbUser: UserDbModel): User {
  const result = new User();
  Object.assign(result, dbUser);
  return result;
}

export enum UserAction {
  FullRead = 'manage',
  PublicRead = 'read',
}

type UserSubject = InferSubjects<typeof User>;

export type UserAbility = Ability<[UserAction, UserSubject]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: UserDbModel) {
    const { can, build } = new AbilityBuilder<UserAbility>(
      Ability as AbilityClass<UserAbility>,
    );

    can(UserAction.FullRead, User, { id: user.id });
    can(UserAction.PublicRead, User);

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<UserSubject>,
    });
  }
}
