import { getBookById } from "@/lib/book";
import {
  StarIcon,
  ClockIcon,
  SpeakerWaveIcon,
  LightBulbIcon,
  BookOpenIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import DurationBadge from "@/components/DurationBadge";
import Link from "next/link";
import BookCover from "@/components/BookCover";

type Book = {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await delay(1000);
  const book: Book = await getBookById(id);

  return (
    <div className="p-6 text-black">
      <div className="max-w-[1100px] pl-2">
        <div className="flex gap-10">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-4xl font-semibold leading-tight">
              {book.title}
            </h1>

            <div className="mt-6 text-sm font-semibold">{book.author}</div>

            <div className="mt-4 text-base text-black/70">{book.subTitle}</div>

            <div className="mt-6 h-px w-full bg-black/10" />

            <div className="mt-4 flex items-center gap-10 text-sm">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <StarIcon className="h-6 w-6" />
                <span className="font-medium">
                  {book.averageRating.toFixed(1)}
                </span>
                <span className="text-black/60">
                  ({book.totalRating} ratings)
                </span>
              </div>

              {/* Duration (hold off real duration for now) */}
              <div className="flex items-center gap-2 text-black/70">
                <ClockIcon className="h-6 w-6" />
                <DurationBadge audioLink={book.audioLink} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-16 text-sm">
              {/* Type */}
              <div className="flex items-center gap-2 text-black/70">
                <SpeakerWaveIcon className="h-6 w-6" />
                <span>{book.type}</span>
              </div>

              {/* Key ideas */}
              <div className="flex items-center gap-2 text-black/70">
                <LightBulbIcon className="h-6 w-6" />
                <span>{book.keyIdeas} Key ideas</span>
              </div>
            </div>

            <div className="mt-6 h-px w-full bg-black/10" />

            <div className="mt-6 flex items-center gap-4">
              {/* Read */}
              <Link
                href={`/player/${book.id}`}
                className="flex items-center gap-2 rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-medium text-white"
              >
                <BookOpenIcon className="h-5 w-5" />
                <span>Read</span>
              </Link>
              {/* Listen */}
              <Link
                href={`/player/${book.id}`}
                className="flex items-center gap-2 rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-medium text-white"
              >
                <SpeakerWaveIcon className="h-5 w-5" />
                <span>Listen</span>
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-black/60">
              <BookmarkIcon className="h-7 w-7" />
              <span>
                Save title to{" "}
                <span className="font-medium text-black">My Library</span>
              </span>
            </div>
          </div>

          {/* Right (cover) */}
          <div className="w-[320px]">
            <div className="flex justify-end">
              <BookCover
                src={book.imageLink}
                alt={book.title}
                className="h-[420px] w-[320px] object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-lg font-semibold">What's it about?</h2>

          <div className="mt-4 flex flex-wrap gap-4">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#f1f5f9] px-6 py-3 text-sm font-medium text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 whitespace-pre-line text-sm leading-7 text-black/80">
            {book.bookDescription}
          </p>
          <div className="mt-12">
            <h2 className="text-lg font-semibold">About the author</h2>

            <p className="mt-4 whitespace-pre-line text-[13.5px] leading-6 text-black/80">
              {book.authorDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
