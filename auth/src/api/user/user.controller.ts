import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("get_users")
  getUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern("get_user")
  getUser(@Payload() params: any) {
    return this.userService.getUser(params.value.id);
  }
}
