import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UsersModule, TrackModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
