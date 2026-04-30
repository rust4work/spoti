import React, { Suspense } from "react";
import { getSpotifyData } from "@/lib/spotify-server";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { redirect } from "next/navigation";

async function TopArtistsGrid() {
  const data = await getSpotifyData("/me/top/artists?limit=50&time_range=long_term");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {data?.items.map((artist: any, index: number) => (
        <Card key={artist.id} className="p-4 flex flex-col items-center text-center group">
          <div className="relative mb-4">
            <img 
              src={artist.images[0]?.url} 
              alt={artist.name} 
              className="w-32 h-32 rounded-full object-cover shadow-lg group-hover:shadow-spotify-green/20 transition-shadow"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center font-bold text-sm border-2 border-card">
              {index + 1}
            </div>
          </div>
          <h3 className="font-semibold text-white group-hover:text-spotify-green transition-colors line-clamp-1">{artist.name}</h3>
          <p className="text-xs text-muted mt-1 capitalize line-clamp-1">{artist.genres[0] || "Artist"}</p>
        </Card>
      ))}
    </div>
  );
}

export default function TopArtistsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Top Artists</h1>
        <p className="text-muted">Your most played artists of all time.</p>
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      }>
        <TopArtistsGrid />
      </Suspense>
    </div>
  );
}
