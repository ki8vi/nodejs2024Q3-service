import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  grammy: boolean;
}
