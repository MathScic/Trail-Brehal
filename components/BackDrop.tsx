"use client";
import Image from "next/image";

export default function Backdrop({
  src,
  alt = "",
  overlay = "bg-black/35",
  priority = false,
}: {
  src: string;
  alt?: string;
  overlay?: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
        role={alt === "" ? "presentation" : undefined}
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
