import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
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
    return this.userService.logUser(registerUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(":id")
  getUser(@Param("id") id: string) {
    return this.userService.getUser(id);
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf("register");
    this.authClient.subscribeToResponseOf("auth");
    this.authClient.subscribeToResponseOf("get_users");
    this.authClient.subscribeToResponseOf("get_user");
    await this.authClient.connect();
  }
}
