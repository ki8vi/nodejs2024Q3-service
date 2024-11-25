import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../albums/album.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, { nullable: true })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity | null;
}
