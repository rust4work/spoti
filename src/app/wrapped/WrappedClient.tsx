"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ChevronRight, Share2 } from "lucide-react";
import type {
  SpotifyTopArtistsResponse,
  SpotifyTopTracksResponse,
} from "@/types/spotify";

interface WrappedClientProps {
  topTracks: SpotifyTopTracksResponse;
  topArtists: SpotifyTopArtistsResponse;
}

export function WrappedClient({ topTracks, topArtists }: WrappedClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const topTrack = topTracks?.items[0];
  const topArtist = topArtists?.items[0];

  const slides = [
    {
      id: "intro",
      content: (
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-spotify-green to-emerald-600">
            Your Spotify <br /> Stats
          </h1>
          <p className="text-2xl text-white/80 font-medium">Let&apos;s see what you&apos;ve been listening to.</p>
        </div>
      ),
      bgClass: "bg-[#191414]",
    },
    {
      id: "top-track",
      content: topTrack ? (
        <div className="text-center flex flex-col items-center">
          <p className="text-2xl text-white/80 font-medium mb-8">Your #1 track of all time was</p>
          {topTrack.album.images[0]?.url && (
            <Image
              src={topTrack.album.images[0].url}
              alt={topTrack.name}
              width={320}
              height={320}
              sizes="(min-width: 768px) 320px, 256px"
              className="mb-8 h-64 w-64 rounded-lg object-cover shadow-2xl md:h-80 md:w-80"
            />
          )}
          <h2 className="text-5xl md:text-6xl font-black mb-2">{topTrack.name}</h2>
          <p className="text-xl text-spotify-green font-bold">{topTrack.artists[0]?.name}</p>
        </div>
      ) : (
        <div className="text-center text-xl">Not enough data.</div>
      ),
      bgClass: "bg-gradient-to-br from-[#4b134f] to-[#c94b4b]",
    },
    {
      id: "top-artist",
      content: topArtist ? (
        <div className="text-center flex flex-col items-center">
          <p className="text-2xl text-white/80 font-medium mb-8">You couldn&apos;t get enough of</p>
          {topArtist.images[0]?.url && (
            <Image
              src={topArtist.images[0].url}
              alt={topArtist.name}
              width={320}
              height={320}
              sizes="(min-width: 768px) 320px, 256px"
              className="mb-8 h-64 w-64 rounded-full object-cover shadow-2xl md:h-80 md:w-80"
            />
          )}
          <h2 className="text-5xl md:text-7xl font-black mb-2 text-spotify-green">{topArtist.name}</h2>
        </div>
      ) : (
        <div className="text-center text-xl">Not enough data.</div>
      ),
      bgClass: "bg-gradient-to-br from-[#2c3e50] to-[#3498db]",
    },
    {
      id: "outro",
      content: (
        <div className="text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-white">Keep on listening.</h1>
          <div className="flex gap-4">
            <Button size="lg" className="rounded-full gap-2">
              <Share2 className="w-5 h-5" /> Share
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      ),
      bgClass: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 flex items-center justify-center p-6 ${slides[currentSlide].bgClass}`}
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      {/* Progress Bars */}
      <div className="absolute top-6 left-0 right-0 px-6 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            {i <= currentSlide && (
              <motion.div
                initial={{ width: i === currentSlide ? "0%" : "100%" }}
                animate={{ width: "100%" }}
                transition={{ duration: i === currentSlide ? 5 : 0, ease: "linear" }}
                onAnimationComplete={() => {
                  if (i === currentSlide && currentSlide < slides.length - 1) {
                    nextSlide();
                  }
                }}
                className="h-full bg-white"
              />
            )}
          </div>
        ))}
      </div>

      {currentSlide < slides.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
