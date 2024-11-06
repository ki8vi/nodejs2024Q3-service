import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { validate } from 'uuid';
import { UserDto } from './user.dto';
import { UpdatePswdDto } from './updatePsw.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();

    const exclPswUserArr = users.map((user) => {
      const cpUser = { ...user };
      delete cpUser.password;
      return cpUser;
    });
    return exclPswUserArr;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} doesn't exist`);
    }
    const exclPswUser = { ...user };
    delete exclPswUser.password;
    return exclPswUser;
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(@Body() body: UserDto) {
    const newUser = await this.usersService.createUser(body);
    const cpUser = { ...newUser };
    delete cpUser.password;
    return cpUser;
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async updateUser(@Param('id') id: string, @Body() body: UpdatePswdDto) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} doesn't exist`);
    }

    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = body.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    const udUser = await this.usersService.updatePsw(user);
    if (udUser !== null) {
      const cpUser = { ...udUser };
      delete cpUser.password;
      return cpUser;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} doesn't exist`);
    }

    await this.usersService.deleteUser(id);

    return;
  }
}
