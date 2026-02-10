"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {items.map((item, idx) => {
        const open = openIndex === idx;

        return (
          <div key={item.q} className="border-t border-black/10">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="text-lg font-bold text-[#032b41] md:text-xl">
                {item.q}
              </span>

              <ChevronDown
                className={`h-6 w-6 shrink-0 text-[#032b41] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Animated answer (always mounted) */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`pb-6 pr-10 text-sm text-[#032b41]/80 transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                  } md:text-base`}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* bottom border to match reference */}
      <div className="border-b border-black/10" />
    </div>
  );
}
