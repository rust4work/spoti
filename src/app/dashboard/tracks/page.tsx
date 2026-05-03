import React, { Suspense } from "react";
import Image from "next/image";
import type { SpotifyTopTracksResponse } from "@/types/spotify";
import { getSpotifyData } from "@/lib/spotify-server";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { Clock } from "lucide-react";
import { AutoRedirect } from "@/components/auth/AutoRedirect";

async function TopTracksList() {
  const result = await getSpotifyData<SpotifyTopTracksResponse>(
    "/me/top/tracks?limit=50&time_range=long_term",
  );

  if (result.status === "unauthenticated" && result.canRefresh) {
    return <AutoRedirect to="/api/auth/refresh?returnTo=/dashboard/tracks" />;
  }

  if (result.status !== "success") {
    return <AutoRedirect to="/api/auth/login" />;
  }

  const data = result.data;

  return (
    <Card className="p-0 overflow-hidden">
      <div className="hidden md:grid grid-cols-[16px_1fr_1fr_minmax(120px,1fr)] gap-4 px-6 py-3 border-b border-white/10 text-xs font-medium text-muted uppercase tracking-wider">
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        <div className="flex justify-end"><Clock className="w-4 h-4" /></div>
      </div>
      <div className="divide-y divide-white/5">
        {data.items.map((track, index) => (
          <div key={track.id} className="group grid grid-cols-[16px_1fr] md:grid-cols-[16px_1fr_1fr_minmax(120px,1fr)] gap-4 px-6 py-3 items-center hover:bg-white/5 transition-colors">
            <div className="text-sm text-muted">{index + 1}</div>
            <div className="flex items-center gap-4 min-w-0">
              {(track.album.images[2]?.url || track.album.images[0]?.url) && (
                <Image
                  src={track.album.images[2]?.url || track.album.images[0].url}
                  alt={track.name}
                  width={40}
                  height={40}
                  sizes="40px"
                  className="h-10 w-10 rounded object-cover"
                />
              )}
              <div className="truncate">
                <p className="text-sm font-medium text-white truncate group-hover:text-spotify-green transition-colors">{track.name}</p>
                <p className="text-xs text-muted truncate">{track.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
            </div>
            <div className="hidden md:block text-sm text-muted truncate">{track.album.name}</div>
            <div className="hidden md:flex justify-end text-sm text-muted">
              {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function TopTracksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Top Tracks</h1>
        <p className="text-muted">Your most played tracks of all time.</p>
      </div>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <TopTracksList />
      </Suspense>
    </div>
  );
}
