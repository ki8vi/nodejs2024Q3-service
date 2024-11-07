import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
  @IsString()
  @IsNotEmpty()
  @Expose()
  artistId: string | null;
  @IsString()
  @IsNotEmpty()
  @Expose()
  albumId: string | null;
  @IsInt()
  @IsNotEmpty()
  @Expose()
  duration: number;
}
