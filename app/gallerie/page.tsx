// app/galerie/page.tsx
import type { Metadata } from "next";
import EditionGallery from "../../components/EditionGalery";
import g2425 from "@/data/gallery.json";
import g2526 from "@/data/gallery-2025-2026.json";

const SITE = "https://trail-des-vikings.fr";

export const metadata: Metadata = {
  title: "Galerie photos – Trail des Vikings (Bréhal)",
  description:
    "Découvrez les photos officielles du Trail des Vikings à Bréhal : meilleures images des éditions 2024-2025 et 2025-2026.",
  alternates: { canonical: `${SITE}/galerie` }, // ← absolu
};

type Photo = { src: string; alt: string };
type Edition = { id: string; title: string; photos: Photo[] };

export default function GaleriePage() {
  const editionsAll: Edition[] = [
    {
      id: "2024-2025",
      title: "Trail – édition 2024-2025",
      photos: g2425 as Photo[],
    },
    {
      id: "2025-2026",
      title: "Trail – édition 2025-2026",
      photos: g2526 as Photo[],
    },
  ];

  // Filtrer les éditions vides
  const editions = editionsAll.filter((ed) => (ed.photos?.length ?? 0) > 0);

  // Helper URL absolue
  const abs = (u: string) =>
    u.startsWith("http") ? u : `${SITE}${u.startsWith("/") ? "" : "/"}${u}`;

  // JSON-LD: CollectionPage + (facultatif) BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/galerie#collection`,
    url: `${SITE}/galerie`,
    name: "Galerie photos – Trail des Vikings",
    hasPart: editions.map((ed) => ({
      "@type": "ImageGallery",
      "@id": `${SITE}/galerie#${ed.id}`,
      name: ed.title,
      url: `${SITE}/galerie#${ed.id}`,
      image: ed.photos.map((p) => ({
        "@type": "ImageObject",
        contentUrl: abs(p.src), // ← absolu
        caption: p.alt,
      })),
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Galerie",
        item: `${SITE}/galerie`,
      },
    ],
  };

  return (
    <main className="relative max-w-6xl mx-auto px-4 py-20 flex-1">
      <h1 className="sr-only">Galerie photos du Trail des Vikings à Bréhal</h1>

      {editions.map((ed, idx) => (
        <EditionGallery
          key={ed.id}
          id={ed.id}
          title={ed.title}
          photos={ed.photos}
          defaultOpen={idx === 0}
        />
      ))}

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </main>
  );
}
