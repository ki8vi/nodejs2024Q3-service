export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
