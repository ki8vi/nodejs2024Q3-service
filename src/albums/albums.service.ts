import { Injectable } from '@nestjs/common';
import { Album } from 'src/models/types';
import { AlbumDto } from './album.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumsService {
  private albums: Album[];

  constructor() {
    this.albums = [];
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(id: string): Promise<Album | null> {
    const album = this.albums.find((alb) => alb.id === id);
    if (album) return album;
    return null;
  }

  async createAlbum(body: AlbumDto) {
    const id = randomUUID();
    const newAlbum: Album = {
      id,
      name: body.name,
      artistId: body.artistId,
      year: body.year,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(artist: Album): Promise<AlbumDto | null> {
    const albumIdx = this.albums.findIndex((alb) => alb.id === artist.id);
    if (albumIdx !== -1) {
      this.albums[albumIdx] = artist;
      return artist;
    }
    return null;
  }

  async deleteAlbum(id: string): Promise<void> {
    const albumIdx = this.albums.findIndex((alb) => alb.id === id);
    if (albumIdx !== -1) {
      this.albums.splice(albumIdx, 1);
    }
  }
}
