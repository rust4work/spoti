"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-md z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu button could go here */}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card rounded-full p-1 pr-3">
              {user.images?.[0] ? (
                <img
                  src={user.images[0].url}
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="text-sm font-medium">{user.display_name}</span>
            </div>
            <button
              onClick={logout}
              className="text-muted hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        )}
      </div>
    </header>
  );
}
