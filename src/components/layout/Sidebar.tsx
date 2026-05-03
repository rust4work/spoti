"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Mic2, LayoutDashboard, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Top Tracks", href: "/dashboard/tracks", icon: Music },
  { name: "Top Artists", href: "/dashboard/artists", icon: Mic2 },
  { name: "Your Wrapped", href: "/wrapped", icon: Gift },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black border-r border-white/10 flex flex-col h-full overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <Music className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">SpotifyStats</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-card rounded-lg p-4 text-sm text-muted">
          <p>Powered by Spotify Web API</p>
        </div>
      </div>
    </aside>
  );
}
