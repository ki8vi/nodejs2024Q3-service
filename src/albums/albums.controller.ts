import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { validate } from 'uuid';
import { AlbumDto } from './album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}
  @Get()
  async getAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} doesn't exist`);
    }
    return album;
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createAlbum(@Body() body: AlbumDto) {
    const newAlbum = await this.albumsService.createAlbum(body);
    return newAlbum;
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async updateAlbum(@Param('id') id: string, @Body() body: AlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} doesn't exist`);
    }
    const updAlbum = await this.albumsService.updateAlbum({ id, ...body });
    if (updAlbum !== null) return updAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} doesn't exist`);
    }

    await this.albumsService.deleteAlbum(id);

    return;
  }
}
