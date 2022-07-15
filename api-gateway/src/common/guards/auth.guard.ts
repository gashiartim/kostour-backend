import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { getUserFromRequest, getUserFromToken } from "../Helpers";
import * as contextService from "request-context";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("comming hereeee");

    if (request) {
      const user = await getUserFromRequest(request);
      console.log("comming hereeee2", user);
      if (!user) {
        return false;
      }
      contextService.set("request:user", user);
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();

      if (!ctx.headers.authorization) {
        return false;
      }

      if (!ctx.user) {
        const user = await getUserFromToken(ctx.headers.authorization);
        ctx.user = user;
        contextService.set("request:user", user);
      }
    }

    console.log("comming hereeee3");
    return true;
  }
}
