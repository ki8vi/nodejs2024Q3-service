import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AlbumDto } from 'src/albums/album.dto';
import { ArtistDto } from 'src/artist/artist.dto';
import {
  Album,
  Artist,
  FavoritesResponse,
  Track,
  User,
} from 'src/models/types';
import { TrackDto } from 'src/track/track.dto';

interface GlobalDB {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };
}

@Injectable()
export class GlobalBdService {
  private globalDB: GlobalDB;

  constructor() {
    this.globalDB = {
      users: [],
      artists: [],
      albums: [],
      tracks: [],
      favorites: {
        artists: [],
        albums: [],
        tracks: [],
      },
    };
  }

  // USERS
  async getUsers(): Promise<User[]> {
    return this.globalDB.users;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.globalDB.users.find((user) => user.id === id);
    return user || null;
  }

  async createUser(user: User): Promise<User> {
    this.globalDB.users.push(user);
    return user;
  }

  async updateUserPassword(changedUser: User): Promise<User | null> {
    const userIdx = this.globalDB.users.findIndex(
      (user) => user.id === changedUser.id,
    );
    if (userIdx !== -1) {
      this.globalDB.users[userIdx] = {
        ...this.globalDB.users[userIdx],
        password: changedUser.password,
      };
      return this.globalDB.users[userIdx];
    }
    return null;
  }

  async updateUser(id: string, updatedUser: User): Promise<User | null> {
    const userIndex = this.globalDB.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    this.globalDB.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const userIndex = this.globalDB.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.globalDB.users.splice(userIndex, 1);
    }
  }

  // ARTISTS
  async getArtists(): Promise<Artist[]> {
    return this.globalDB.artists;
  }

  async getArtistById(id: string): Promise<Artist | null> {
    const artist = this.globalDB.artists.find((artist) => artist.id === id);
    return artist || null;
  }

  async createArtist(body: ArtistDto): Promise<Artist> {
    const id = randomUUID();
    const newArtist: Artist = {
      id,
      name: body.name,
      grammy: body.grammy,
    };
    this.globalDB.artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(updatedArtist: Artist): Promise<Artist | null> {
    const artistIndex = this.globalDB.artists.findIndex(
      (artist) => artist.id === updatedArtist.id,
    );
    if (artistIndex === -1) return null;
    this.globalDB.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artistIndex = this.globalDB.artists.findIndex(
      (artist) => artist.id === id,
    );
    const artist = this.globalDB.artists[artistIndex];
    this.globalDB.artists.splice(artistIndex, 1);
    if (artistIndex !== -1) {
      this.globalDB.albums.forEach((album) => {
        if (album.artistId === artist.id) {
          album.artistId = null;
        }
      });
      this.globalDB.tracks.forEach((track) => {
        if (track.artistId === artist.id) {
          track.artistId = null;
        }
      });
      this.globalDB.favorites.artists = this.globalDB.favorites.artists.filter(
        (artistId) => artistId !== artist.id,
      );
    }
  }

  // ALBUMS
  async getAlbums(): Promise<Album[]> {
    return this.globalDB.albums;
  }

  async getAlbumById(id: string): Promise<Album | null> {
    const album = this.globalDB.albums.find((album) => album.id === id);
    return album || null;
  }

  async createAlbum(body: AlbumDto): Promise<Album> {
    const id = randomUUID();
    const newAlbum: Album = {
      id,
      name: body.name,
      artistId: body.artistId,
      year: body.year,
    };

    const artistExists = this.globalDB.artists.find(
      (artist) => artist.id === newAlbum.artistId,
    );

    if (!artistExists) {
      newAlbum.artistId = null;
    } else {
      newAlbum.artistId = artistExists.id;
    }
    this.globalDB.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, updatedAlbum: Album): Promise<Album | null> {
    const albumIndex = this.globalDB.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex === -1) return null;
    this.globalDB.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    const albumIndex = this.globalDB.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex !== -1) {
      this.globalDB.albums.splice(albumIndex, 1);
      this.globalDB.favorites.albums = this.globalDB.favorites.albums.filter(
        (albumId) => albumId !== id,
      );

      this.globalDB.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    }
  }

  // TRACKS
  async getTracks(): Promise<Track[]> {
    return this.globalDB.tracks;
  }

  async getTrackById(id: string): Promise<Track | null> {
    const track = this.globalDB.tracks.find((track) => track.id === id);
    return track || null;
  }

  async createTrack(body: TrackDto): Promise<Track> {
    const albumExists = this.globalDB.albums.find(
      (album) => album.id === body.albumId,
    );
    const artistExists = this.globalDB.artists.find(
      (artist) => artist.id === body.artistId,
    );

    if (body.albumId && !albumExists) {
      throw new BadRequestException(
        `Album with ID ${body.albumId} does not exist`,
      );
    }
    if (body.artistId && !artistExists) {
      throw new BadRequestException(
        `Artist with ID ${body.artistId} does not exist`,
      );
    }

    const id = randomUUID();
    const newTrack: Track = {
      id,
      name: body.name,
      artistId: body.artistId || null,
      albumId: body.albumId || null,
      duration: body.duration,
    };

    this.globalDB.tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, updatedTrack: Track): Promise<Track | null> {
    const trackIndex = this.globalDB.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex === -1) return null;
    this.globalDB.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    const trackIndex = this.globalDB.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex !== -1) {
      this.globalDB.tracks.splice(trackIndex, 1);
      this.globalDB.favorites.tracks = this.globalDB.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    }
  }

  // FAVORITES
  async getFavorites(): Promise<FavoritesResponse> {
    const { artists, albums, tracks } = this.globalDB.favorites;

    const favoriteArtists = this.globalDB.artists.filter((artist) =>
      artists.includes(artist.id),
    );

    const favoriteAlbums = this.globalDB.albums.filter((album) =>
      albums.includes(album.id),
    );

    const favoriteTracks = this.globalDB.tracks.filter((track) =>
      tracks.includes(track.id),
    );

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  async addFavoriteArtist(artistId: string): Promise<number> {
    if (this.globalDB.artists.some((art) => art.id === artistId)) {
      this.globalDB.favorites.artists.push(artistId);
      this.globalDB.favorites.artists = Array.from(
        new Set(this.globalDB.favorites.artists),
      );
      return 201;
    }
    return 422;
  }

  async removeFavoriteArtist(artistId: string): Promise<number> {
    if (this.globalDB.favorites.artists.includes(artistId)) {
      this.globalDB.favorites.artists = this.globalDB.favorites.artists.filter(
        (id) => id !== artistId,
      );
      return 204;
    }
    return 404;
  }

  async addFavoriteAlbum(albumId: string): Promise<number> {
    if (this.globalDB.albums.some((alb) => alb.id === albumId)) {
      this.globalDB.favorites.albums.push(albumId);
      this.globalDB.favorites.albums = Array.from(
        new Set(this.globalDB.favorites.albums),
      );
      return 201;
    }
    return 422;
  }

  async removeFavoriteAlbum(albumId: string): Promise<number> {
    if (this.globalDB.favorites.albums.includes(albumId)) {
      this.globalDB.favorites.albums = this.globalDB.favorites.albums.filter(
        (id) => id !== albumId,
      );
      return 204;
    }
    return 404;
  }

  async addFavoriteTrack(trackId: string): Promise<number> {
    if (this.globalDB.tracks.some((tr) => tr.id === trackId)) {
      this.globalDB.favorites.tracks.push(trackId);
      this.globalDB.favorites.tracks = Array.from(
        new Set(this.globalDB.favorites.tracks),
      );
      return 201;
    }
    return 422;
  }

  async removeFavoriteTrack(trackId: string): Promise<number> {
    if (this.globalDB.favorites.tracks.includes(trackId)) {
      this.globalDB.favorites.tracks = this.globalDB.favorites.tracks.filter(
        (id) => id !== trackId,
      );
      return 204;
    }
    return 404;
  }
}
