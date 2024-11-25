import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  login: string;
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}
