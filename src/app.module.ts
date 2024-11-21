import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { GlobalBdModule } from './global-bd/global-bd.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { UserEntity } from './users/user.entity';
import { TrackEntity } from './track/track.entity';
import { ArtistEntity } from './artist/artist.entity';
import { AlbumEntity } from './albums/album.entity';
import { FavoritesEntity } from './favorites/favorites.entity';

@Module({
  imports: [
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumsModule,
    FavoritesModule,
    GlobalBdModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'ki8vi',
      password: process.env.DB_PSW || 'rs12345',
      database: process.env.DB_NAME || 'library',
      entities: [
        UserEntity,
        TrackEntity,
        ArtistEntity,
        AlbumEntity,
        FavoritesEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
