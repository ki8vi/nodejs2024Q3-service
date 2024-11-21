import { AlbumEntity } from 'src/albums/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: ArtistEntity[];

  @Column('uuid', { array: true, default: [] })
  albums: AlbumEntity[];

  @Column('uuid', { array: true, default: [] })
  tracks: TrackEntity[];
}
