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
import { TrackService } from './track.service';
import { TrackDto } from './track.dto';
import { validate } from 'uuid';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  async getTracks() {
    return this.trackService.getAllTacks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} doesn't exist`);
    }
    return track;
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createTrack(@Body() body: TrackDto) {
    const newTrack = await this.trackService.create(body);
    return newTrack;
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )
  async updateTrack(@Param('id') id: string, @Body() body: TrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} doesn't exist`);
    }
    const updTrack = await this.trackService.updateTrack({ id, ...body });
    if (updTrack !== null) return updTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UUID format is invalid');
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} doesn't exist`);
    }

    await this.trackService.deleteTrack(id);

    return;
  }
}
