import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { RoleService } from "../role/role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../role/entities/role.entity";
import { User } from "../user/entities/user.entity";
import { AuthServiceGeneral } from "../../services/auth/AuthService";
import { HashService } from "../../services/hash/HashService";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [AuthController],
  providers: [AuthService, RoleService, AuthServiceGeneral, HashService],
})
export class AuthModule {}
