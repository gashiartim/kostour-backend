import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

// import { UserContactForm } from "../../api/user/dto/user.dto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  readonly fromEmail: string = "kutiaprojects@gmail.com";
  readonly SITE_URL: string = "http://localhost:3001";
  readonly APP_URL: string = process.env.APP_URL;

  public deleteUserByCultureAdmin(user: any) {
    this.mailerService
      .sendMail({
        to: user.email,
        from: this.getFromEmail(),
        subject: this.getSubject("Your account was deleted by our admins!"),
        template: this.getEmailTemplatePath("deleteUser"),
        context: {
          first_name: user.first_name,
          user_name: `${user.first_name} ${user.last_name}`,
        },
      })
      .then((data) => console.log(data))
      .catch((error) => {
        throw error;
      });
  }

  public async forgotPassword(userToken: any) {
    return await this.mailerService
      .sendMail({
        to: userToken.user.email,
        from: this.getFromEmail(),
        subject: this.getSubject(`Reset your account's password`),
        template: this.getEmailTemplatePath("forgotPassword"),
        context: {
          user: userToken.user,
          link: `${this.APP_URL}/set-new-password?token=${userToken.access_token.access_token}`,
        },
      })
      .then((data) => console.log(data))
      .catch((error) => {
        throw error;
      });
  }

  public getEmailTemplatePath(template_name) {
    return `templates/${template_name}`;
  }
  public getSubject(subject) {
    return subject;
  }
  private getFromEmail() {
    return this.fromEmail;
  }
}
