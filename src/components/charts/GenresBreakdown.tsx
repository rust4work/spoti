"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card } from "../ui/Card";

interface GenresBreakdownProps {
  artists: any[];
}

const COLORS = ["#1DB954", "#1ed760", "#40e0d0", "#191414", "#b3b3b3"];

export function GenresBreakdown({ artists }: GenresBreakdownProps) {
  const data = useMemo(() => {
    if (!artists) return [];
    
    const genreCounts: Record<string, number> = {};
    artists.forEach((artist) => {
      artist.genres.forEach((genre: string) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, [artists]);

  if (data.length === 0) return null;

  return (
    <Card className="h-[400px] flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Top Genres</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
