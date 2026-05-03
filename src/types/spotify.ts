export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  followers?: {
    href: string | null;
    total: number;
  };
  genres: string[];
  images: SpotifyImage[];
  href: string;
  uri: string;
  popularity?: number;
}

export interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: SpotifyArtist[];
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: { spotify: string };
    uri: string;
  } | null;
}

export interface SpotifyPagingResponse<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyCursorPagingResponse<T> {
  cursors?: {
    after?: string;
    before?: string;
  };
  href: string;
  items: T[];
  limit: number;
  next: string | null;
}

export type SpotifyTopTracksResponse = SpotifyPagingResponse<SpotifyTrack>;
export type SpotifyTopArtistsResponse = SpotifyPagingResponse<SpotifyArtist>;
export type SpotifyRecentlyPlayedResponse =
  SpotifyCursorPagingResponse<SpotifyRecentlyPlayedItem>;

export interface SpotifyUserProfile {
  id: string;
  display_name: string | null;
  email?: string;
  images: SpotifyImage[];
}
