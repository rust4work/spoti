import React from "react";
import { getSpotifyData } from "@/lib/spotify-server";
import { WrappedClient } from "./WrappedClient";
import type {
  SpotifyTopArtistsResponse,
  SpotifyTopTracksResponse,
} from "@/types/spotify";
import { AutoRedirect } from "@/components/auth/AutoRedirect";

export default async function WrappedPage() {
  const [topTracks, topArtists] = await Promise.all([
    getSpotifyData<SpotifyTopTracksResponse>(
      "/me/top/tracks?limit=1&time_range=long_term",
    ),
    getSpotifyData<SpotifyTopArtistsResponse>(
      "/me/top/artists?limit=5&time_range=long_term",
    ),
  ]);

  if (
    (topTracks.status === "unauthenticated" && topTracks.canRefresh) ||
    (topArtists.status === "unauthenticated" && topArtists.canRefresh)
  ) {
    return <AutoRedirect to="/api/auth/refresh?returnTo=/wrapped" />;
  }

  if (topTracks.status !== "success" || topArtists.status !== "success") {
    return <AutoRedirect to="/api/auth/login" />;
  }

  return <WrappedClient topTracks={topTracks.data} topArtists={topArtists.data} />;
}
