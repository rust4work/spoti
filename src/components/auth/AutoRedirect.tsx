"use client";

import { useEffect } from "react";

export function AutoRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-spotify-green border-t-transparent rounded-full animate-spin" />
        <p className="text-muted text-sm">Refreshing session...</p>
      </div>
    </div>
  );
}
