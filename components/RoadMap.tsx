"use client";

import { useState } from "react";
import Image from "next/image";
import ModalRunVideo from "@/components/ModalRunVideo";

type Item = {
  kmLabel: string;
  title: string;
  desc?: string;
  videoSrc: string;
  poster: string; // IMPORTANT : mets un poster pour un rendu pro
  meta?: string; // ex: "Départ 11h15 • Bréhal • 10,1 km"
};

const items: Item[] = [
  {
    kmLabel: "10 km",
    title: "Parcours 10 km",
    desc: "Le format phare : mer & bocage, relances et passages techniques.",
    meta: "Départ 11h15 • 10,1 km",
    videoSrc: "/videos/10km.mp4",
    poster: "/images/poster/10km.png",
  },
  {
    kmLabel: "5 km",
    title: "Parcours 5 km",
    desc: "Accessible et rapide. Idéal pour se challenger.",
    meta: "Départ 10h00 • 5,1 km",
    videoSrc: "/videos/5km.mp4",
    poster: "/images/poster/5km.png",
  },
  // {
  //   kmLabel: "Marche",
  //   title: "Parcours marche",
  //   desc: "Pour profiter du tracé sans chrono.",
  //   meta: "Départ 10h30",
  //   videoSrc: "/videos/marche.mp4",
  //   poster: "/images/posters/marche.jpg",
  // },
];

export default function RoadMap() {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.title}
            className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition"
          >
            {/* Background poster */}
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={it.poster}
                alt={it.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={false}
              />

              {/* Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

              {/* Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-sm font-extrabold text-[#0d1b33]">
                {it.kmLabel}
              </div>

              {/* Hover overlay : bouton Play uniquement */}
              <button
                onClick={() => setActive(it)}
                aria-label={`Lire la vidéo : ${it.title}`}
                className="
    absolute inset-0
    flex items-center justify-center
    opacity-100 md:opacity-0 md:group-hover:opacity-100
    transition-opacity duration-200
    cursor-pointer
  "
              >
                {/* Triangle Play (sans fond, sans contour) */}
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 24 24"
                  className="text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
                  aria-hidden="true"
                >
                  <path fill="currentColor" d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      <ModalRunVideo
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
        src={active?.videoSrc ?? ""}
        poster={active?.poster}
      />
    </>
  );
}
