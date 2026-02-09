"use client";

import BookCover from "@/components/BookCover";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
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
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const elapsedLabel = formatTime(currentTime);
  const remainingLabel = formatTime(duration - currentTime);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // browser blocked play (rare) — ignore for now
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    // duration can be NaN before metadata loads, so clamp safely
    const d = Number.isFinite(audio.duration) ? audio.duration : 0;
    const next = Math.max(
      0,
      Math.min(audio.currentTime + delta, d || audio.currentTime + delta),
    );
    audio.currentTime = Math.max(0, next);
  };

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
          >
            -10
          </button>

          <button
            onClick={togglePlay}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white/90"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => skip(10)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            +10
          </button>
        </div>

        <div className="ml-auto flex w-full max-w-[520px] items-center gap-3">
          <div className="w-12 text-right text-xs tabular-nums text-white/70">
            {elapsedLabel}
          </div>

          <input
            type="range"
            min={0}
            max={duration || 1}
            value={Number.isFinite(currentTime) ? currentTime : 0}
            onChange={(e) => {
              const audio = audioRef.current;
              if (!audio) return;
              audio.currentTime = Number(e.target.value);
            }}
            className="w-full"
          />

          <div className="w-12 text-xs tabular-nums text-white/70">
            -{remainingLabel}
          </div>
        </div>

        {/* audio element */}
        <audio ref={audioRef} src={audioLink} preload="metadata" />
      </div>
    </div>
  );
}
