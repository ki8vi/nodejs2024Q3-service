import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
  @IsInt()
  @IsNotEmpty()
  @Expose()
  year: number;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Expose()
  artistId: string | null;
}
