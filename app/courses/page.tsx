// app/courses/page.tsx
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

type Course = {
  slug: string;
  km: number;
  name: string;
  desc: string;
  img: string;
  signupUrl: string;
};

const allCourses: Course[] = [
  {
    slug: "5km",
    km: 5.1,
    name: "Conquête des dunes",
    desc: "Ouverte à tous. Départ 10h, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-5km.jpeg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },

  {
    slug: "10km",
    km: 10.1,
    name: "La traversée des Vikings",
    desc: "Ouverte à tous. Départ 11h15, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-10km.jpg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },

  {
    slug: "Marche",
    km: 0,
    name: "La rando des Vikings",
    desc: "Ouverte à tous. Départ 10h30, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-marche.jpg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "Course enfants - 2017/2018",
    km: 0,
    name: "Le mini-drakar",
    desc: "Départ 14h, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-enfants-1.jpeg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },

  {
    slug: "Course enfants - 2015/2016",
    km: 1.1,
    name: "Les petits Vikings",
    desc: "Départ 14h30, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-enfants-2.jpeg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },

  {
    slug: "Course enfants - 2013/2014",
    km: 2.2,
    name: "Les apprentis guerriers",
    desc: "Départ 15h15, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-enfants-3.jpeg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },

  {
    slug: "Course enfants - 2011/2012",
    km: 2.8,
    name: "Les apprentis guerriers",
    desc: "Départ 16h15, Place Monaco 50290 Bréhal. Arrivée au même endroit que le départ.. Inscription ??€ / pers.",
    img: "/images/courses-enfants-4.jpeg",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
];

export default function AllCoursesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center">
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
                alt={`${c.km} km – ${c.name}`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
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
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-800 transition"
              >
                S’inscrire
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
