"use client";

import { FiSearch } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRecommended } from "@/lib/recommended";
import { getSelected } from "@/lib/selected";

type Book = {
  id: string;
  title: string;
  author: string;
  imageLink: string;
};

export default function Topbar() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const MIN_SKELETON_TIME = 600; // ms

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const start = Date.now();

      try {
        const [recommended, selected] = await Promise.all([
          getRecommended(),
          getSelected(),
        ]);

        const map = new Map<string, Book>();
        [...recommended, ...selected].forEach((b) => map.set(b.id, b));

        if (mounted) setBooks(Array.from(map.values()));
      } finally {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_SKELETON_TIME - elapsed);

        setTimeout(() => {
          if (mounted) setLoading(false);
        }, remaining);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query),
      )
      .slice(0, 8);
  }, [q, books]);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-end px-6">
        <div className="relative w-full max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-md border bg-[#f1f6f4] py-2 pl-4 pr-10 text-sm text-[#032b41] placeholder-[#032b41]/50 outline-none focus:border-[#2bd97c]"
            placeholder="Search for books"
          />

          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#032b41]/70"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>

          {q.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[420px] overflow-auto rounded-2xl border border-black/10 bg-white shadow-lg">
              {loading ? (
                <div className="p-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl px-3 py-3"
                    >
                      <div className="h-12 w-12 rounded-lg bg-black/10 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 w-3/4 rounded bg-black/10 animate-pulse" />
                        <div className="mt-2 h-3 w-1/2 rounded bg-black/10 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-black/50">
                  No results
                </div>
              ) : (
                results.map((b) => (
                  <Link
                    key={b.id}
                    href={`/book/${b.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-black/5"
                    onClick={() => setQ("")}
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-black/5">
                      <Image
                        src={b.imageLink}
                        alt={b.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#032b41]">
                        {b.title}
                      </div>
                      <div className="truncate text-xs text-black/50">
                        {b.author}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-px w-full bg-gray-200" />
    </header>
  );
}
