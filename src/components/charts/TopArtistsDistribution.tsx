"use client";

import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/Card";

interface TopArtistsDistributionProps {
  artists: any[];
}

export function TopArtistsDistribution({ artists }: TopArtistsDistributionProps) {
  const data = useMemo(() => {
    if (!artists) return [];
    
    return artists.slice(0, 10).map((artist) => ({
      name: artist.name,
      popularity: artist.popularity,
    }));
  }, [artists]);

  if (data.length === 0) return null;

  return (
    <Card className="h-[400px] flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Top Artists Popularity</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#b3b3b3" />
            <YAxis dataKey="name" type="category" width={100} stroke="#b3b3b3" tick={{ fill: '#b3b3b3', fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{ backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
            />
            <Bar dataKey="popularity" fill="#1DB954" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
