"use client";

import BookCover from "@/components/BookCover";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type Props = {
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  loading?: boolean;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function BottomPlayer({
  title,
  author,
  imageLink,
  audioLink,
  loading = false,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isLoading = loading || !title || !author || !imageLink || !audioLink;

  const hasMetadata = Number.isFinite(duration) && duration > 0;
  const elapsedLabel = formatTime(currentTime);
  const remainingLabel = formatTime(Math.max(0, duration - currentTime));

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        // isPlaying will be set by onPlay
      } catch {
        // browser blocked play (rare) — ignore for now
      }
    } else {
      audio.pause();
      // isPlaying will be set by onPause
    }
  };

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const d = Number.isFinite(audio.duration) ? audio.duration : 0;
    const next = Math.max(
      0,
      Math.min(audio.currentTime + delta, d || audio.currentTime + delta),
    );
    audio.currentTime = Math.max(0, next);
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-[240px] right-0 z-[9999] border-t border-black/10 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-3">
          {/* Left: cover + text */}
          <div className="flex min-w-[260px] items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded bg-white/10" />

            <div className="leading-tight">
              <div className="h-4 w-44 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-3 w-28 animate-pulse rounded bg-white/10" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-12 animate-pulse rounded-full bg-white/10" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
            <div className="h-9 w-12 animate-pulse rounded-full bg-white/10" />
          </div>

          {/* Timeline */}
          <div className="ml-auto flex w-full max-w-[520px] items-center gap-3">
            <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
            <div className="h-2 w-full animate-pulse rounded bg-white/10" />
            <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-[240px] right-0 z-[9999] border-t border-black/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-3">
        <div className="flex min-w-[260px] items-center gap-3">
          <BookCover
            src={imageLink}
            alt={title}
            className="h-12 w-12 rounded object-cover"
          />

          <div className="leading-tight">
            <div className="text-sm font-semibold line-clamp-1">{title}</div>
            <div className="text-xs text-white/70 line-clamp-1">{author}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => skip(-10)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            type="button"
          >
            -10
          </button>

          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 hover:bg-white/90"
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-[2px]" />
            )}
          </button>

          <button
            onClick={() => skip(10)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            type="button"
          >
            +10
          </button>
        </div>

        <div className="ml-auto flex w-full max-w-[520px] items-center gap-3">
          <div className="w-12 text-right text-xs tabular-nums text-white/70">
            {hasMetadata ? elapsedLabel : "--:--"}
          </div>

          <input
            type="range"
            min={0}
            max={Math.max(duration, 0.01)}
            value={Math.min(currentTime, duration || currentTime)}
            onChange={(e) => {
              const audio = audioRef.current;
              if (!audio) return;
              audio.currentTime = Number(e.target.value);
              setCurrentTime(Number(e.target.value)); // keeps UI responsive during drag
            }}
            className="w-full"
          />

          <div className="w-12 text-xs tabular-nums text-white/70">
            {hasMetadata ? `-${remainingLabel}` : "--:--"}
          </div>
        </div>

        {/* audio element */}
        <audio
          key={audioLink} // remount when src changes
          ref={audioRef}
          src={audioLink}
          preload="metadata"
          onLoadedMetadata={(e) => {
            const audio = e.currentTarget;
            const d = audio.duration;

            if (Number.isFinite(d) && d > 0) {
              setDuration(d);
            } else if (audio.seekable && audio.seekable.length > 0) {
              const end = audio.seekable.end(0);
              if (Number.isFinite(end) && end > 0) setDuration(end);
            }
          }}
          onDurationChange={(e) => {
            const audio = e.currentTarget;
            const d = audio.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime || 0);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
