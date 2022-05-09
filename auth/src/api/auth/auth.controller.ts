import { Body, Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./entities/dto/register-user.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("register")
  async register(@Payload() registerUserDto: any): Promise<any> {
    console.log({ registerUserDto });

    return await this.authService.register(registerUserDto.value);
  }

  @MessagePattern("auth")
  login(@Payload() logUserDto: any): Promise<any> {
    console.log({ logUserDto });

    return this.authService.login(logUserDto.value);
  }

  // @Post("/forgot-password")
  // async forgotPassword(@Body() data: ForgotPasswordDto, @Res() res) {
  //   const userToken = await this.authService.forgotPassword(data);

  //   this.emitter.emit("forgotPasswordMail", userToken);

  //   return res.json({
  //     message: "Please check your email and set your new password!",
  //   });
  // }

  // @Post("/set-new-password/:token")
  // async setNewPassword(
  //   @Param("token") token: string,
  //   @Body() data: ResetPasswordDto,
  //   @Res() res
  // ) {
  //   return await this.authService.setPassword(token, data, res);
  // }
}
