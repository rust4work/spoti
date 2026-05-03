"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Session Expired or API Error</h2>
        <p className="text-muted max-w-md mx-auto mb-6">
          We couldn&apos;t load your Spotify data. Your session might have expired, or Spotify&apos;s API might be temporarily unavailable.
        </p>
      </div>
      <div className="flex gap-4">
        <a href="/api/auth/login">
          <Button>Log In Again</Button>
        </a>
        <Button variant="outline" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
