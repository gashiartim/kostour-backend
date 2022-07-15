import { Controller, UseGuards } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { AuthGuard } from "../../common/guards/auth.guard";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(new AuthGuard())
  @MessagePattern("get_users")
  getUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern("get_user")
  getUser(@Payload() params: any) {
    return this.userService.getUser(params.value.id);
  }
}
