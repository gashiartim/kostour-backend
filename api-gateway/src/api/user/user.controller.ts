import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterUserDto } from '../../dtos/register-user-dto';

@Controller('api/users')
export class UserController implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  @Post()
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.registerUser(registerUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('register');
    await this.authClient.connect();
  }
}
