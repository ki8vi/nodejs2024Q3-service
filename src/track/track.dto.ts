import { Expose } from 'class-transformer';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class TrackDto {
  @IsString()
  @Expose()
  name: string;
  @IsString()
  @IsOptional()
  @Expose()
  artistId: string | null;
  @IsString()
  @IsOptional()
  @Expose()
  albumId: string | null;
  @IsInt()
  @Expose()
  duration: number;
}
