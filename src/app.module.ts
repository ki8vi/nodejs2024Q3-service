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
      password: process.env.DB_PASSWORD || 'rs12345',
      database: process.env.DB_NAME || 'library',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
