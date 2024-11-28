import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { GlobalBdService } from 'src/global-bd/global-bd.service';
import { User } from 'src/models/types';
import 'dotenv/config';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly globalService: GlobalBdService,
  ) {}

  async signup(dto: SignupDto): Promise<User> {
    const { login, password } = dto;

    if (typeof login !== 'string' || typeof password !== 'string') {
      throw new BadRequestException(
        'Invalid input. Login and password must be strings.',
      );
    }

    const users = await this.globalService.getUsers();
    const userExists = users.some((user) => user.login === login);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser: User = {
      id: randomUUID(),
      login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = await this.globalService.createUser(newUser);

    return createdUser;
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = dto;

    if (typeof login !== 'string' || typeof password !== 'string') {
      throw new BadRequestException(
        'Invalid input. Login and password must be strings.',
      );
    }

    const users = await this.globalService.getUsers();
    const user = users.find((user) => user.login === login);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, login };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async refresh(
    dto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = dto;

    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const { sub, login } = payload;
      const accessToken = this.jwtService.sign(
        { sub, login },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      );
      const newRefreshToken = this.jwtService.sign(
        { sub, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      );

      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
