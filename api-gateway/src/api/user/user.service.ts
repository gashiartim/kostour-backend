import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserRegisteredEvent } from '../../events/user-registered-event';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientKafka) {}

  registerUser(userRegisteredEventDto: UserRegisteredEvent) {
    const { first_name, last_name, email, password } = userRegisteredEventDto;

    return this.authClient.send(
      'register',
      new UserRegisteredEvent(first_name, last_name, email, password),
    );
  }

  getUsers() {
    return this.authClient.send<string, any>('get_users', '');
  }
}
