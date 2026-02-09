"use client";


type BookCoverProps = {
  src?: string;
  alt: string;
  className?: string;
};

export default function BookCover({ src, alt, className }: BookCoverProps) {
  const safeSrc =
    src?.replace(/^http:\/\//, "https://") || "/placeholder-cover.png";

  return (
    <img
      src={safeSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/placeholder-cover.png";
      }}
    />
  );
}
