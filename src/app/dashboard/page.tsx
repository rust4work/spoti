import React, { Suspense } from "react";
import { getSpotifyData } from "@/lib/spotify-server";
import { StatCard } from "@/components/ui/StatCard";
import { Music, Mic2, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { ChartsWrapper } from "./ChartsWrapper";
import { redirect } from "next/navigation";
import { SpotifyArtist, SpotifyRecentlyPlayedItem } from "@/types/spotify";

async function DashboardOverview() {
  const [topTracks, topArtists, recentlyPlayed] = await Promise.all([
    getSpotifyData("/me/top/tracks?limit=5&time_range=short_term"),
    getSpotifyData("/me/top/artists?limit=5&time_range=short_term"),
    getSpotifyData("/me/player/recently-played?limit=10"),
  ]);

  if (!topTracks || !topArtists || !recentlyPlayed) {
    redirect("/api/auth/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-muted">Your Spotify activity at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Top Track"
          value={topTracks?.items[0]?.name || "N/A"}
          description={topTracks?.items[0]?.artists[0]?.name}
          icon={<Music />}
        />
        <StatCard
          title="Top Artist"
          value={topArtists?.items[0]?.name || "N/A"}
          description={`${topArtists?.items[0]?.followers?.total.toLocaleString()} followers`}
          icon={<Mic2 />}
        />
        <StatCard
          title="Recent Listens"
          value={recentlyPlayed?.items.length || 0}
          description="In your recent history"
          icon={<Clock />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Played */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recently Played</h2>
          </div>
          <div className="space-y-4">
            {recentlyPlayed?.items.slice(0, 5).map((item: SpotifyRecentlyPlayedItem, i: number) => (
              <div key={`${item.track.id}-${i}`} className="flex items-center gap-4 group">
                <img
                  src={item.track.album.images[0]?.url}
                  alt={item.track.name}
                  className="w-12 h-12 rounded shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-spotify-green transition-colors">
                    {item.track.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {item.track.artists.map((a: SpotifyArtist) => a.name).join(", ")}
                  </p>
                </div>
                <div className="text-xs text-muted">
                  {new Date(item.played_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Artists Quick View */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Top Artists</h2>
            <Link href="/dashboard/artists" className="text-sm text-spotify-green hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {topArtists?.items.map((artist: SpotifyArtist) => (
              <div key={artist.id} className="flex items-center gap-4 group">
                <img
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full shadow-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-spotify-green transition-colors">
                    {artist.name}
                  </p>
                  <p className="text-xs text-muted capitalize">
                    {artist.genres.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ChartsWrapper artists={topArtists?.items || []} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      }
    >
      <DashboardOverview />
    </Suspense>
  );
}
