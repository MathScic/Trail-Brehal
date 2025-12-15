// app/courses/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import coursesData from "@/data/courses.json";
import RunVideo from "@/components/ModalRunVideo";

const SITE = "https://trail-des-vikings.fr";

export const metadata: Metadata = {
  title: "Courses – Trail des Vikings (Bréhal)",
  description:
    "Toutes les courses du Trail des Vikings à Bréhal : horaires, distances, parcours et inscriptions.",
  alternates: { canonical: `${SITE}/courses` }, // ← absolu
};

type Course = {
  slug: string;
  km: number;
  name: string;
  desc: string;
  img: string;
  signupUrl: string;
};

const allCourses = (coursesData as Course[]).filter(Boolean); // évite les entrées vides

export default function AllCoursesPage() {
  // JSON-LD minimal : CollectionPage + ItemList (liens d’inscription)
  const itemListElements = allCourses.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${c.km ? `${c.km} km — ` : ""}${c.name}`,
    url: c.signupUrl,
  }));

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/courses#collection`,
    url: `${SITE}/courses`,
    name: "Courses – Trail des Vikings",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: itemListElements,
    },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${SITE}/courses`,
      },
    ],
  };

  return (
    <main
      className="max-w-6xl mx-auto px-4 py-16 flex-1"
      aria-labelledby="courses-title"
    >
      <h1
        id="courses-title"
        className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center"
      >
        Toutes les courses
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {allCourses.map((c) => (
          <article
            key={c.slug}
            className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md transition hover:shadow-lg hover:-translate-y-0.5 text-center"
          >
            <div className="relative w-full aspect-[16/9] rounded-t-2xl overflow-hidden">
              <Image
                src={c.img}
                alt={c.img ? `${c.km} km – ${c.name}` : c.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={false} // lazy par défaut
              />
            </div>

            <div className="p-6 flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-extrabold text-blue-800 tracking-tight">
                {c.km} km – {c.name}
              </h2>

              <p className="text-gray-600 mt-2">{c.desc}</p>

              <Link
                href={c.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Inscription ${c.km} km – ${c.name}`}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-800 transition"
              >
                S’inscrire
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* JSON-LD (léger, sans duplication DOM) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <RunVideo />
    </main>
  );
}
