import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  LoginUserDto,
  RegisterUserDto,
} from "./entities/dto/register-user.dto";
import { RoleService } from "../role/role.service";
import { User } from "../user/entities/user.entity";
import { AuthServiceGeneral } from "../../services/auth/AuthService";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "../../services/hash/HashService";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly authService: AuthServiceGeneral,
    private readonly hashService: HashService
  ) {}

  async register(data: any) {
    const res = await this.checkIfEmailExists(data.email);

    if (res?.message) {
      return res;
    }

    const adminRole = await this.roleService.getRoleBySlug("admin");

    if (!adminRole) {
      throw new HttpException("Role does not exists!", HttpStatus.NOT_FOUND);
    }

    let user = await this.userRepository.create({
      first_name: data.first_name,
      last_name: data.last_name,
      birthday: data.birthday,
      email: data.email,
      password: data.password,
      role_id: adminRole.id,
    });
    await this.userRepository.save(user);

    user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where({ id: user.id })
      .getOne();

    const { password, ...userWithoutPassword } = user;

    return this.authService.sign(
      {
        userId: user.id,
      },
      { user: { ...userWithoutPassword, id: user.id, email: user.email } }
    );
  }

  public async login(data: LoginUserDto): Promise<any> {
    // const user = await this.userRepository.findOne({ email: data.email });
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where({ email: data.email })
      .getOne();
    if (!user) {
      throw new HttpException("User does not exists!", HttpStatus.NOT_FOUND);
    }
    if (!(await this.hashService.compare(data.password, user.password))) {
      return {
        status: 422,
        message: "Password does not match!",
      };
    }
    const { password, ...userWithoutPassword } = user;
    return this.authService.sign(
      { userId: user.id, email: user.email },
      { user: { ...userWithoutPassword, id: user.id, email: user.email } }
    );
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  public async checkIfEmailExists(email: string): Promise<any> {
    const user = await this.getUserByEmail(email);

    if (user) {
      return {
        status: 422,
        message: "Email already exists!",
      };
    }

    return user;
  }
}
