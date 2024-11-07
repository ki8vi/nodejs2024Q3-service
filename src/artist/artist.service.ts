import { Injectable } from '@nestjs/common';
import { Artist } from 'src/models/types';
import { ArtistDto } from './artist.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  private artists: Artist[];

  constructor() {
    this.artists = [];
  }

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistById(id: string): Promise<Artist | null> {
    const artist = this.artists.find((us) => us.id === id);
    if (artist) return artist;
    return null;
  }

  async createArtist(body: ArtistDto) {
    const id = randomUUID();
    const newArtist: Artist = {
      id,
      name: body.name,
      grammy: body.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(artist: Artist): Promise<ArtistDto | null> {
    const artistIdx = this.artists.findIndex((art) => art.id === artist.id);
    if (artistIdx !== -1) {
      this.artists[artistIdx] = artist;
      return artist;
    }
    return null;
  }

  async deleteArtist(id: string): Promise<void> {
    const artistIdx = this.artists.findIndex((art) => art.id === id);
    if (artistIdx !== -1) {
      this.artists.splice(artistIdx, 1);
    }
  }
}
