// app/galerie/page.tsx
import type { Metadata } from "next";
import EditionGallery from "../../components/EditionGalery";
import g2425 from "@/data/gallery.json"; // 24/25
import g2526 from "@/data/gallery-2025-2026.json"; // 25/26 (peut être [])

const SITE = "https://trail-des-vikings.fr";

export const metadata: Metadata = {
  title: "Galerie photos – Trail des Vikings (Bréhal)",
  description:
    "Découvrez les photos officielles du Trail des Vikings à Bréhal : meilleures images des éditions 2024-2025 et 2025-2026.",
  alternates: { canonical: `${SITE}/galerie` },
};

type Photo = { src: string; alt: string };
type Edition = { id: string; title: string; photos: Photo[] };

export default function GaleriePage() {
  const editions: Edition[] = [
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

  const abs = (u: string) =>
    u.startsWith("http") ? u : `${SITE}${u.startsWith("/") ? "" : "/"}${u}`;

  // JSON-LD : liste les 2 éditions; ajoute "image" uniquement si dispo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/galerie#collection`,
    url: `${SITE}/galerie`,
    name: "Galerie photos – Trail des Vikings",
    hasPart: editions.map((ed) => {
      const part: any = {
        "@type": "ImageGallery",
        "@id": `${SITE}/galerie#${ed.id}`,
        name: ed.title,
        url: `${SITE}/galerie#${ed.id}`,
      };
      if (ed.photos?.length) {
        part.image = ed.photos.map((p) => ({
          "@type": "ImageObject",
          contentUrl: abs(p.src),
          caption: p.alt,
        }));
      }
      return part;
    }),
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

      {editions.map((ed) => (
        <EditionGallery
          key={ed.id}
          id={ed.id}
          title={ed.title}
          photos={ed.photos}
          // rien passé => fermé par défaut
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
