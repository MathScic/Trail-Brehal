"use client";
import Image from "next/image";

export default function Backdrop({
  src,
  alt,
  overlay = "bg-black/35",
}: {
  src: string;
  alt: string;
  overlay?: string;
}) {
  return (
    <div className="absolute inset-0">
      <Image src={src} alt={alt} fill priority className="object-cover" />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
