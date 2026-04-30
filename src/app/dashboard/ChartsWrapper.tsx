"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

const GenresBreakdown = dynamic(() => import("@/components/charts/GenresBreakdown").then(mod => mod.GenresBreakdown), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
});

const TopArtistsDistribution = dynamic(() => import("@/components/charts/TopArtistsDistribution").then(mod => mod.TopArtistsDistribution), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
});

export function ChartsWrapper({ artists }: { artists: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <GenresBreakdown artists={artists} />
      <TopArtistsDistribution artists={artists} />
    </div>
  );
}
