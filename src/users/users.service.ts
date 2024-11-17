import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { GlobalBdService } from 'src/global-bd/global-bd.service';
import { CreateUserDto, User } from 'src/models/types';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private global: GlobalBdService) {}

  // async getUsers(): Promise<User[]> {
  //   return await this.global.getUsers();
  // }

  // async getUserById(id: string): Promise<User | null> {
  //   const users = await this.global.getUsers();
  //   const user = users.find((us) => us.id === id);
  //   if (user) return user;
  //   return null;
  // }
  async getUsers(): Promise<UserEntity[]> {
    return await this.global.getUsers();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const users = await this.global.getUsers();
    const user = users.find((us) => us.id === id);
    if (user) return user;
    return null;
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const { login, password } = body;
    const today = Date.now();
    const user: User = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: today,
      updatedAt: today,
    };
    this.global.createUser(user);
    return user;
  }

  async updatePsw(changedUser: User): Promise<User | null> {
    return await this.global.updateUser(changedUser.id, changedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.global.deleteUser(id);
  }
}
