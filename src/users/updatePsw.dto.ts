import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePswdDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  newPassword: string;
}
