"use client";

import { useEffect } from "react";
import { usePlayer, type PlayerBook } from "./PlayerContext";

export default function SyncPlayer({ book }: { book: PlayerBook }) {
  const { setBook } = usePlayer();

  useEffect(() => {
    setBook(null);

    const t = setTimeout(() => {
      setBook(book);
    }, 800); 

    return () => clearTimeout(t);
  }, [book, setBook]);

  return null;
}
