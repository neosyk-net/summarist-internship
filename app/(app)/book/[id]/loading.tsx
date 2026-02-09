export default function Loading() {
  return (
    <div className="p-6 text-black">
      <div className="max-w-[1100px] pl-8">
        <div className="flex gap-10">
          {/* Left */}
          <div className="flex-1">
            {/* Title */}
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-gray-200" />

            {/* Author */}
            <div className="mt-6 h-4 w-40 animate-pulse rounded bg-gray-200" />

            {/* Subtitle */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-9/12 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mt-6 h-px w-full bg-black/10" />

            {/* Rating + duration row */}
            <div className="mt-4 flex items-center gap-10">
              <div className="h-4 w-44 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Type + key ideas row */}
            <div className="mt-4 flex items-center gap-16">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mt-4 h-px w-full bg-black/10" />

            {/* Buttons */}
            <div className="mt-6 flex items-center gap-4">
              <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200" />
            </div>

            {/* Saved row */}
            <div className="mt-4 h-4 w-56 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Right (cover) */}
          <div className="w-[320px]">
            <div className="flex justify-end">
              <div className="h-[260px] w-[200px] animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* What's it about */}
        <div className="mt-10">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>

          {/* Paragraph */}
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-10/12 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-9/12 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* About the author */}
        <div className="mt-10">
          <div className="h-6 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-10/12 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
