import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user-dto';

@Injectable()
export class AppService {
  users = [];

  getHello(): string {
    return 'Hello World!';
  }
}
