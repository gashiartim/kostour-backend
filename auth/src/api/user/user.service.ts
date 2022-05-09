import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginUserDto } from "../auth/entities/dto/register-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  getUsers() {
    return this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .getMany();
  }

  async getUser(id: string) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where({ id })
      .getMany();

    return user;
  }
}
