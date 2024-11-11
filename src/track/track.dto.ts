import { Expose } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Expose()
  artistId: string | null;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Expose()
  albumId: string | null;
  @IsNotEmpty()
  @IsInt()
  @Expose()
  duration: number;
}
