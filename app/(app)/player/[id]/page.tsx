import { getBookById } from "@/lib/book";
import BottomPlayer from "./BottomPlayer";

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
  const book: Book = await getBookById(id);

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
      <BottomPlayer
        title={book.title}
        author={book.author}
        imageLink={book.imageLink}
        audioLink={book.audioLink}
      />
    </div>
  );
}
