import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, TrackModule, ArtistModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
