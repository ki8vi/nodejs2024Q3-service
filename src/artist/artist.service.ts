import { Injectable } from '@nestjs/common';
import { Artist } from 'src/models/types';
import { ArtistDto } from './artist.dto';
import { GlobalBdService } from 'src/global-bd/global-bd.service';

@Injectable()
export class ArtistService {
  constructor(private global: GlobalBdService) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.global.getArtists();
  }

  async getArtistById(id: string): Promise<Artist | null> {
    return await this.global.getArtistById(id);
  }

  async createArtist(body: ArtistDto) {
    return await this.global.createArtist(body);
  }

  async updateArtist(artist: Artist): Promise<ArtistDto | null> {
    return await this.global.updateArtist(artist);
  }

  async deleteArtist(id: string): Promise<void> {
    return await this.global.deleteArtist(id);
  }
}
