import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';
import { Response } from 'express';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavs();
  }

  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id') trackId: string,
    @Res() response: Response,
  ) {
    if (validate(trackId)) {
      const res = await this.favoritesService.addTrackToFavorites(trackId);
      if (res === 201) {
        return response.status(201).json({
          statusCode: 201,
          message: 'Track added to favorites',
        });
      }
      if (res === 422) {
        return response.status(422).json({
          statusCode: 422,
          message: 'Track does not exist in favorites',
        });
      }
    }
    throw new BadRequestException('UUID format is invalid');
  }

  @Delete('track/:id')
  async deleteTrackFromFavorites(
    @Param('id') trackId: string,
    @Res() response: Response,
  ) {
    if (validate(trackId)) {
      const res = await this.favoritesService.deleteTrackFomFavorites(trackId);
      if (res === 204) {
        return response.status(204).json({
          statusCode: 204,
          message: 'Track removed from favorites',
        });
      }
      if (res === 404) {
        return response.status(404).json({
          statusCode: 404,
          message: 'Track does not exist in favorites',
        });
      }
    }
    throw new BadRequestException('UUID format is invalid');
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id') albumId: string,
    @Res() response: Response,
  ) {
    if (validate(albumId)) {
      const res = await this.favoritesService.addAlbumToFavorites(albumId);
      if (res === 201) {
        return response.status(201).json({
          statusCode: 201,
          message: 'Album added to favorites',
        });
      }
      if (res === 422) {
        return response.status(422).json({
          statusCode: 422,
          message: 'Album does not exist in favorites',
        });
      }
    }
    throw new BadRequestException('UUID format is invalid');
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorites(
    @Param('id') albumId: string,
    @Res() response: Response,
  ) {
    if (validate(albumId)) {
      const res = await this.favoritesService.deleteAlbumFomFavorites(albumId);
      if (res === 204) {
        return response.status(204).json({
          statusCode: 204,
          message: 'Album removed from favorites',
        });
      }
      if (res === 404) {
        return response.status(404).json({
          statusCode: 404,
          message: 'Album does not exist in favorites',
        });
      }
    }
    throw new BadRequestException('UUID format is invalid');
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id') artistId: string,
    @Res() response: Response,
  ) {
    if (validate(artistId)) {
      const res = await this.favoritesService.addArtistToFavorites(artistId);
      if (res === 201) {
        return response.status(201).json({
          statusCode: 201,
          message: 'Artist added to favorites',
        });
      }
      if (res === 422) {
        return response.status(422).json({
          statusCode: 422,
          message: 'Artist does not exist in favorites',
        });
      }
    }
    throw new BadRequestException('UUID format is invalid');
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id') artistId: string,
    @Res() response: Response,
  ) {
    if (validate(artistId)) {
      const res = await this.favoritesService.deleteArtistFomFavorites(
        artistId,
      );
      if (res === 204) {
        return response.status(204).json({
          statusCode: 204,
          message: 'Artist removed from favorites',
        });
      }
      if (res === 404) {
        return response.status(404).json({
          statusCode: 404,
          message: 'Artist does not exist in favorites',
        });
      }
    }
    throw new BadRequestException('UUID format is invalid');
  }
}
