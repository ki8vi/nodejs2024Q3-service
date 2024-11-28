import { Injectable } from '@nestjs/common';
import { GlobalBdService } from 'src/global-bd/global-bd.service';
import { FavoritesResponse } from 'src/models/types';

@Injectable()
export class FavoritesService {
  constructor(private global: GlobalBdService) {}

  async getAllFavs(): Promise<FavoritesResponse> {
    return await this.global.getFavorites();
  }

  async addTrackToFavorites(trackId: string) {
    return await this.global.addFavoriteTrack(trackId);
  }

  async deleteTrackFomFavorites(trackId: string) {
    return await this.global.removeFavoriteTrack(trackId);
  }

  async addAlbumToFavorites(albumId: string) {
    return await this.global.addFavoriteAlbum(albumId);
  }

  async deleteAlbumFomFavorites(albumId: string) {
    return await this.global.removeFavoriteAlbum(albumId);
  }

  async addArtistToFavorites(artistId: string) {
    return await this.global.addFavoriteArtist(artistId);
  }

  async deleteArtistFomFavorites(artistId: string) {
    return await this.global.removeFavoriteArtist(artistId);
  }
}
