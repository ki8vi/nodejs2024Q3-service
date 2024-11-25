import { Global, Module } from '@nestjs/common';
import { GlobalBdService } from './global-bd.service';
import { UserEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/track.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { AlbumEntity } from 'src/albums/album.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entity';

@Global()
@Module({
  providers: [GlobalBdService],
  exports: [GlobalBdService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
      FavoritesEntity,
    ]),
  ],
})
export class GlobalBdModule {}
