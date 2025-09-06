// app/galerie/page.tsx
"use client";

import EditionGallery from "../../components/EditionGalery";
import g2425 from "@/data/gallery.json"; // <-- ton fichier généré
import g2526 from "@/data/gallery-2025-2026.json"; // <-- vide pour l’instant

type Photo = { src: string; alt: string };

export default function GaleriePage() {
  const editions = [
    {
      id: "2024-2025",
      title: "Trail éditions 2024/2025",
      photos: g2425 as Photo[],
    },
    {
      id: "2025-2026",
      title: "Trail éditions 2025/2026",
      photos: g2526 as Photo[],
    },
  ];

  return (
    <main className="relative max-w-6xl mx-auto px-4 py-20 flex-1">
      {editions.map((ed, idx) => (
        <EditionGallery
          key={ed.id}
          id={ed.id}
          title={ed.title}
          photos={ed.photos}
          defaultOpen={idx === 0} // la plus récente ouverte par défaut si tu veux
        />
      ))}
    </main>
  );
}
