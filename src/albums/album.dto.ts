import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Expose()
  year: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  artistId: string;
}
