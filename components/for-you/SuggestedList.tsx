"use client";

import { useEffect, useState } from "react";
import { getSuggested } from "@/lib/suggested";
import DurationBadge from "../DurationBadge";
import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BookCover from "../BookCover";

type Book = {
  id: string;
  title: string;
  author?: string;
  imageLink?: string;
  averageRating?: number;
  subscriptionRequired?: boolean;
  audioLink?: string;
};

function SuggestedSkeleton() {
  return (
    <div className="p-4 text-black">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-2 h-6 w-52 animate-pulse rounded bg-gray-200" />
        <div className="mb-8 h-4 w-48 animate-pulse rounded bg-gray-200" />

        <ul className="grid grid-cols-5 gap-x-10 gap-y-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="w-full">
              <div className="mb-3 h-56 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />

              {/* bottom row placeholder (duration + rating) */}
              <div className="mt-3 h-4 w-28 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SuggestedList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    let ignore = false;

    getSuggested()
      .then((data) => {
        if (ignore) return;
        const list = Array.isArray(data) ? data : (data?.books ?? []);

        setBooks(list.slice(0, 5));
      })
      .catch(() => {
        if (ignore) return;
        setError("Failed to load suggested books");
      })
      .finally(() => {
        if (ignore) return;

        setTimeout(() => {
          if (!ignore) {
            setShowSkeleton(false);
            setLoading(false);
          }
        }, 800);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (showSkeleton) return <SuggestedSkeleton />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 text-black">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-1 text-lg font-semibold">Suggested Books</h2>
        <p className="mb-8 text-sm opacity-70">Browse those books</p>

        <ul className="grid grid-cols-5 gap-x-10 gap-y-10">
          {books.map((b) => (
            <li key={b.id} className="w-full">
              <Link
                href={`/book/${b.id}`}
                className="block cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="relative mb-3">
                  {b.subscriptionRequired && (
                    <span className="absolute right-2 top-2 z-10 rounded-full bg-[#0f172a] px-2 py-1 text-[11px] font-medium text-white ring-2 ring-white shadow">
                      Premium
                    </span>
                  )}

                  <BookCover
                    src={b.imageLink}
                    alt={b.title}
                    className="h-56 w-full object-cover"
                  />
                </div>

                <div className="text-sm font-semibold leading-snug">
                  {b.title}
                </div>

                {b.author && (
                  <div className="mt-1 text-xs text-black/60">{b.author}</div>
                )}

                <div className="mt-3 flex items-center gap-4 text-sm text-black/60">
                  {/* Duration placeholder */}
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-black/50" />
                    <DurationBadge audioLink={b.audioLink} />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-black/50" />
                    <span>{b.averageRating ?? "--"}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
