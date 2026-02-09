"use client";

import { createContext, useContext, useState } from "react";

export type PlayerBook = {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
};

type PlayerContextType = {
  book: PlayerBook | null;
  setBook: (book: PlayerBook | null) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [book, setBook] = useState<PlayerBook | null>(null);

  return (
    <PlayerContext.Provider value={{ book, setBook }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return ctx;
}
