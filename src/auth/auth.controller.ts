import {
  Controller,
  Post,
  Body,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, RefreshTokenDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SetMetadata('noAuth', true)
  async signup(@Body() dto: SignupDto) {
    try {
      return await this.authService.signup(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  @SetMetadata('noAuth', true)
  async login(@Body() dto: LoginDto) {
    try {
      return await this.authService.login(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    try {
      return await this.authService.refresh(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
