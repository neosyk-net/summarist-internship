"use client";

import { useEffect, useState } from "react";
import { getSelected } from "@/lib/selected";
import Link from "next/link";
import BookCover from "../BookCover";

type Book = any; // we’ll type this properly after we see the shape

function SelectedSkeleton() {
  return (
    <div className="p-4">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center gap-8 rounded-2xl bg-[#fbf1db] px-10 py-8">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-24 w-px bg-black/20" />

          <div className="h-28 w-20 animate-pulse rounded bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    let ignore = false;

    getSelected()
      .then((data) => {
        if (ignore) return;

        // handle both "array" or "{ books: [...] }" responses
        const list = Array.isArray(data) ? data : (data?.books ?? []);
        console.log("selected first item:", list?.[0]);
        setBooks(list);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err?.message || "Failed to load selected books");
      })
      .finally(() => {
        if (ignore) return;

        // ensure skeleton shows for at least 600ms
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

  if (showSkeleton) return <SelectedSkeleton />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-4 text-lg font-semibold text-black">
          Selected just for you
        </h2>

        {books.map((b) => (
          <Link
            key={b.id}
            href={`/book/${b.id}`}
            className="block cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div
              key={b.id}
              className="flex items-center gap-8 rounded-2xl bg-[#fbf1db] px-10 py-8"
            >
              {/* Left: subtitle */}
              <div className="flex-1 text-[14px] leading-5 text-black">
                {b.subTitle}
              </div>

              {/* Divider */}
              <div className="h-24 w-px bg-black/20" />

              {/* Center: book image */}
              <div className="flex-none">
                <BookCover
                  src={b.imageLink}
                  alt={b.title}
                  className="h-56 w-full object-cover"
                />
              </div>

              {/* Right: info */}
              <div className="flex-1 text-black">
                <div className="text-[16px] font-semibold">{b.title}</div>
                <div className="mt-1 text-[14px] text-black/70">{b.author}</div>

                <div className="mt-4 flex items-center gap-3 text-[14px]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    ▶
                  </div>
                  <span className="text-black/70">3 mins 23 secs</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
