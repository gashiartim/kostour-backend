import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HashService } from '../../../services/hash/HashService';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/entities/role.entity';
import { UserRO } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  first_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  last_name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date;

  @Column({ type: 'text', select: true })
  @Exclude()
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  phone: string;

  @ManyToOne((type) => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    type: 'text',
    nullable: true,
  })
  role_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password)
      this.password = await new HashService().make(this.password);
  }

  private get token() {
    const { id, email } = this;

    return jwt.sign(
      {
        id,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }

  public toResponseObject(showToken = true): UserRO {
    const responseObject: any = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      birthday: this.birthday
        ? moment(this.birthday).format('DD/MM/YYYY')
        : null,
      phone: this.phone,
      role_id: this.role_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    if (showToken) {
      responseObject.token = this.token;
    }

    return responseObject;
  }
}
