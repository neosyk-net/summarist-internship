"use client";
import { FiSearch } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-end px-6">
        <div className="relative w-full max-w-md">
          <input
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
        </div>
      </div>
      <div className="h-px w-full bg-gray-200" />
    </header>
  );
}
