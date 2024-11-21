import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { TrackEntity } from '../track/track.entity';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];
}
