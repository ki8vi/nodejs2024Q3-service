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
import { ArtistService } from './artist.service';
import { validate } from 'uuid';
import { ArtistDto } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  async getArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} doesn't exist`);
    }
    return artist;
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createArtist(@Body() body: ArtistDto) {
    const newArtist = await this.artistService.createArtist(body);
    return newArtist;
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async updateArtist(@Param('id') id: string, @Body() body: ArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} doesn't exist`);
    }
    const updArtist = await this.artistService.updateArtist({
      id,
      ...body,
    });
    if (updArtist !== null) return updArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} doesn't exist`);
    }

    await this.artistService.deleteArtist(id);

    return;
  }
}
