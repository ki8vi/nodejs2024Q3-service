import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDto } from 'src/albums/album.dto';
import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistDto } from 'src/artist/artist.dto';
import { ArtistEntity } from 'src/artist/artist.entity';
import { FavoritesEntity } from 'src/favorites/favorites.entity';
import { FavoritesResponse, User } from 'src/models/types';
import { TrackDto } from 'src/track/track.dto';
import { TrackEntity } from 'src/track/track.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GlobalBdService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,

    @InjectRepository(FavoritesEntity)
    private favoriteRepository: Repository<FavoritesEntity>,
  ) {}

  // USERS

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user || null;
  }
  async createUser(user: User): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: string, updatedUser: User): Promise<User | null> {
    await this.userRepository.update(id, updatedUser);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // ARTISTS

  async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<ArtistEntity | null> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    return artist || null;
  }

  async createArtist(dto: ArtistDto): Promise<ArtistEntity> {
    const artist = this.artistRepository.create(dto);
    return await this.artistRepository.save(artist);
  }

  async updateArtist(id: string, dto: ArtistDto): Promise<ArtistEntity | null> {
    await this.artistRepository.update(id, dto);
    return await this.artistRepository.findOne({ where: { id } });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.artistRepository.delete(id);
  }

  // ALBUMS

  async getAlbums(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<AlbumEntity | null> {
    const artist = await this.albumRepository.findOne({ where: { id } });
    return artist || null;
  }

  async createAlbum(dto: AlbumDto): Promise<AlbumEntity> {
    const album = this.albumRepository.create(dto);
    return await this.albumRepository.save(album);
  }

  async updateAlbum(id: string, dto: AlbumDto): Promise<AlbumEntity | null> {
    await this.albumRepository.update(id, dto);
    return await this.albumRepository.findOne({ where: { id } });
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albumRepository.delete(id);
  }

  // TRACKS
  async getTracks(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<TrackEntity | null> {
    const artist = await this.trackRepository.findOne({ where: { id } });
    return artist || null;
  }

  async createTrack(dto: TrackDto): Promise<TrackEntity> {
    const track = this.trackRepository.create(dto);
    return await this.trackRepository.save(track);
  }

  async updateTrack(id: string, dto: TrackDto): Promise<TrackEntity | null> {
    await this.trackRepository.update(id, dto);
    return await this.trackRepository.findOne({ where: { id } });
  }

  async deleteTrack(id: string): Promise<void> {
    await this.trackRepository.delete(id);
  }

  // FAVORITES

  async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.favoriteRepository.findOne({
      relations: ['artists', 'albums', 'tracks'],
    });

    return {
      artists: favorites?.artists || [],
      albums: favorites?.albums || [],
      tracks: favorites?.tracks || [],
    };
  }

  async addFavoriteArtist(artistId: string): Promise<number> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (artist) {
      const favorites = await this.favoriteRepository.findOne({
        relations: ['artists'],
      });

      if (favorites) {
        favorites.artists.push(artist);
        await this.favoriteRepository.save(favorites);
        return 201;
      }
    }

    return 422;
  }

  async removeFavoriteArtist(artistId: string): Promise<number> {
    const favorites = await this.favoriteRepository.findOne({
      relations: ['artists'],
    });

    if (favorites) {
      favorites.artists = favorites.artists.filter(
        (artist) => artist.id !== artistId,
      );
      await this.favoriteRepository.save(favorites);
      return 204;
    }

    return 404;
  }

  async addFavoriteAlbum(albumId: string): Promise<number> {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (album) {
      const favorites = await this.favoriteRepository.findOne({
        relations: ['albums'],
      });

      if (favorites) {
        favorites.albums.push(album);
        await this.favoriteRepository.save(favorites);
        return 201;
      }
    }

    return 422;
  }

  async removeFavoriteAlbum(albumId: string): Promise<number> {
    const favorites = await this.favoriteRepository.findOne({
      relations: ['albums'],
    });

    if (favorites) {
      favorites.albums = favorites.albums.filter(
        (album) => album.id !== albumId,
      );
      await this.favoriteRepository.save(favorites);
      return 204;
    }

    return 404;
  }

  async addFavoriteTrack(trackId: string): Promise<number> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (track) {
      const favorites = await this.favoriteRepository.findOne({
        relations: ['tracks'],
      });

      if (favorites) {
        favorites.tracks.push(track);
        await this.favoriteRepository.save(favorites);
        return 201;
      }
    }

    return 422;
  }

  async removeFavoriteTrack(trackId: string): Promise<number> {
    const favorites = await this.favoriteRepository.findOne({
      relations: ['tracks'],
    });

    if (favorites) {
      favorites.tracks = favorites.tracks.filter(
        (track) => track.id !== trackId,
      );
      await this.favoriteRepository.save(favorites);
      return 204;
    }

    return 404;
  }
}
