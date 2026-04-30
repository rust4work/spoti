import React from "react";
import { getSpotifyData } from "@/lib/spotify-server";
import { WrappedClient } from "./WrappedClient";

export default async function WrappedPage() {
  const [topTracks, topArtists] = await Promise.all([
    getSpotifyData("/me/top/tracks?limit=1&time_range=long_term"),
    getSpotifyData("/me/top/artists?limit=5&time_range=long_term"),
  ]);

  return <WrappedClient topTracks={topTracks} topArtists={topArtists} />;
}
