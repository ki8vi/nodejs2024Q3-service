import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto, User } from 'src/models/types';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find((us) => us.id === id);
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
    this.users.push(user);
    return user;
  }

  async updatePsw(changedUser: User): Promise<User | null> {
    const userIdx = this.users.findIndex((user) => user.id === changedUser.id);
    if (userIdx !== -1) {
      this.users[userIdx] = changedUser;
      return changedUser;
    }
    return null;
  }

  async deleteUser(id: string): Promise<void> {
    const userIdx = this.users.findIndex((user) => user.id === id);
    if (userIdx !== -1) {
      this.users.splice(userIdx, 1);
    }
  }
}
