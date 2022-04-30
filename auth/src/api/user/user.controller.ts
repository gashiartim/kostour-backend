import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @EventPattern('user_registered')
  // register(data: any) {
  //   return this.appService.registerUser(data.value);
  // }

  // @MessagePattern('get_users')
  // getUsers(data: any) {
  //   console.log({ data_on_obj: data });

  //   return this.appService.getUsers();
  // }
}
