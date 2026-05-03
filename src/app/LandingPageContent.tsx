"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Music } from "lucide-react";

export function LandingPageContent() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden h-screen bg-black">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-spotify-green/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(29,185,84,0.4)]"
        >
          <Music className="w-10 h-10 text-black" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Your Spotify, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green to-emerald-400">
            Visualized.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl">
          Dive deep into your listening habits. Discover your top tracks, artists, and genres with stunning, interactive analytics.
        </p>

        <a href="/api/auth/login">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
            Connect with Spotify
          </Button>
        </a>
      </motion.div>

      <div className="absolute bottom-10 text-sm text-white/40">
        A modern Spotify analytics experience.
      </div>
    </main>
  );
}
