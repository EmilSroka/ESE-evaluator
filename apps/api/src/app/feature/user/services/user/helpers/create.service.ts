import { Injectable, Logger } from '@nestjs/common';
import { Subscriber } from 'rxjs';
import {
  CreatedEntityIsNotOfTypeUser,
  UserWithEmailDoesAlreadyExistError,
} from '../user.service';

@Injectable()
export class CreateService {
  constructor(private logger: Logger) {}

  handleWrongType(subscriber: Subscriber<string>, response: any) {
    this.logger.log(
      `UserService: Unable to create user -> created entity is not of type User, entity: ${response}`,
    );
    subscriber.error(
      new CreatedEntityIsNotOfTypeUser(
        `Created value does not satisfy User type constraints`,
      ),
    );
  }

  handleCreationError(subscriber: Subscriber<string>, error: Error) {
    this.logger.error(
      `UserService: Unable to create user -> db error: ${error}`,
    );
    subscriber.error(error);
  }

  handleUnexpectedError(subscriber: Subscriber<string>, error: Error) {
    this.logger.error(
      `UserService: Unable to create user -> when checking email availability, error: ${error}`,
    );
    subscriber.error(error);
  }

  handleEmailTaken(subscriber: Subscriber<string>, email: string) {
    this.logger.warn(
      `UserService: Unable to create user -> email already taken, email: ${email}`,
    );
    return new UserWithEmailDoesAlreadyExistError(
      `Cannot create user because email "${email}" is already taken`,
    );
  }
}
