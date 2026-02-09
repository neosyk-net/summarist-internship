export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getBookById } from "@/lib/book";
import SyncPlayer from "../SyncPlayer";
import type { PlayerBook } from "../PlayerContext";

type Book = {
  id: string;
  title: string;
  summary: string;
  audioLink: string;
  author: string;
  imageLink: string;
};

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // intentional delay so /player/loading.tsx shows
  await new Promise((r) => setTimeout(r, 400));

  const book: Book = await getBookById(id);

  const playerBook: PlayerBook = {
    id: book.id,
    title: book.title,
    author: book.author,
    imageLink: book.imageLink,
    audioLink: book.audioLink,
  };

  return (
    <div className="min-h-screen bg-white text-black pb-24">
      {/* main content area */}
      <div className="mx-auto max-w-[900px] px-6 py-10">
        {/* Title */}
        <h1 className="text-[24px] font-bold text-blue-950">{book.title}</h1>

        {/* Divider */}
        <hr className="mt-4 border-t border-gray-300 opacity-40" />

        {/* Content */}
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-black/80">
          <p className="whitespace-pre-line">{book.summary}</p>
        </div>
      </div>

      {/* feeds the persistent bottom player (in /player/layout.tsx) */}
      <SyncPlayer book={playerBook} />
    </div>
  );
}
