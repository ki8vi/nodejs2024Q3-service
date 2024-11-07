import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Track } from 'src/models/types';
import { TrackDto } from './track.dto';

@Injectable()
export class TrackService {
  private tracks: Track[];
  constructor() {
    this.tracks = [];
  }

  async getAllTacks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(id: string): Promise<Track | null> {
    const track = this.tracks.find((us) => us.id === id);
    if (track) return track;
    return null;
  }

  async create(body: TrackDto) {
    const id = randomUUID();
    const newTrack: Track = {
      id,
      name: body.name,
      artistId: body.artistId,
      albumId: body.albumId,
      duration: body.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(track: Track): Promise<TrackDto | null> {
    const trackIdx = this.tracks.findIndex((tr) => tr.id === track.id);
    if (trackIdx !== -1) {
      this.tracks[trackIdx] = track;
      return track;
    }
    return null;
  }

  async deleteTrack(id: string): Promise<void> {
    const trackIdx = this.tracks.findIndex((user) => user.id === id);
    if (trackIdx !== -1) {
      this.tracks.splice(trackIdx, 1);
    }
  }
}
