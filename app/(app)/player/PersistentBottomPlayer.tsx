"use client";

import BottomPlayer from "./[id]/BottomPlayer";
import { usePlayer } from "./PlayerContext";

export default function PersistentBottomPlayer() {
  const { book } = usePlayer();

  return (
    <BottomPlayer
      title={book?.title ?? ""}
      author={book?.author ?? ""}
      imageLink={book?.imageLink ?? ""}
      audioLink={book?.audioLink ?? ""}
      loading={!book}
    />
  );
}
