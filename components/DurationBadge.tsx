"use client";

import { useEffect, useState } from "react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function DurationBadge({ audioLink }: { audioLink?: string }) {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!audioLink) {
      setDuration(0);
      return;
    }

    const audio = new Audio(audioLink);
    audio.preload = "metadata";

    const onLoaded = () => setDuration(audio.duration || 0);
    const onError = () => setDuration(0);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
      audio.src = "";
    };
  }, [audioLink]);

  const label = duration === null ? "--:--" : formatTime(duration);

  return <span className="text-black/60 tabular-nums">{label}</span>;
}
