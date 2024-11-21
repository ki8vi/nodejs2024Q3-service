import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../albums/album.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: false })
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];
}
