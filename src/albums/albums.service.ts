import { Injectable } from '@nestjs/common';
import { Album } from 'src/models/types';
import { AlbumDto } from './album.dto';
import { GlobalBdService } from 'src/global-bd/global-bd.service';

@Injectable()
export class AlbumsService {
  constructor(private global: GlobalBdService) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.global.getAlbums();
  }

  async getAlbumById(id: string): Promise<Album | null> {
    return await this.global.getAlbumById(id);
  }

  async createAlbum(body: AlbumDto) {
    return await this.global.createAlbum(body);
  }

  async updateAlbum(body: Album): Promise<AlbumDto | null> {
    return await this.global.updateAlbum(body.id, body);
  }

  async deleteAlbum(id: string): Promise<void> {
    return await this.global.deleteAlbum(id);
  }
}
