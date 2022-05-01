import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { RegisterUserDto } from "../../dtos/register-user-dto";
import { LogUserDto } from "../../dtos/log-user-dto";

@Controller("api/users")
export class UserController implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    @Inject("AUTH_SERVICE") private readonly authClient: ClientKafka
  ) {}

  @Post("register")
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.registerUser(registerUserDto);
  }

  @Post("auth")
  logUser(@Body() registerUserDto: LogUserDto) {
    console.log("arrivedhere");

    return this.userService.logUser(registerUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf("register");
    this.authClient.subscribeToResponseOf("auth");
    await this.authClient.connect();
  }
}
