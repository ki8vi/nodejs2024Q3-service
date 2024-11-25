import { Injectable } from '@nestjs/common';
import { Track } from 'src/models/types';
import { TrackDto } from './track.dto';
import { GlobalBdService } from 'src/global-bd/global-bd.service';

@Injectable()
export class TrackService {
  constructor(private global: GlobalBdService) {}

  async getAllTacks(): Promise<Track[]> {
    return await this.global.getTracks();
  }

  async getTrackById(id: string): Promise<Track | null> {
    return await this.global.getTrackById(id);
  }

  async create(body: TrackDto) {
    return await this.global.createTrack(body);
  }

  async updateTrack(track: Track): Promise<TrackDto | null> {
    return await this.global.updateTrack(track.id, track);
  }

  async deleteTrack(id: string): Promise<void> {
    return await this.global.deleteTrack(id);
  }
}
