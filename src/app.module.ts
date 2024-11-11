import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { GlobalBdModule } from './global-bd/global-bd.module';

@Module({
  imports: [
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumsModule,
    FavoritesModule,
    GlobalBdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
