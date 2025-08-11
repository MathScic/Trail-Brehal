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
    slug: "marche-5200",
    km: 5.2,
    name: "Marche – non chronométrée",
    desc: "Ouverte à tous. Départ 11h30. Inscription 3€ / pers.",
    img: "/images/Marche.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-580",
    km: 0.58,
    name: "Course enfants 580 m – non chronométrée",
    desc: "Nés en 2016-2017. Départ 10h00. Inscription 3€.",
    img: "/images/Courses1.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-1100",
    km: 1.1,
    name: "Course enfants 1 100 m – non chronométrée",
    desc: "Nés en 2014-2015. Départ 10h30. Inscription 3€.",
    img: "/images/Courses 3.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-2200",
    km: 2.2,
    name: "Course enfants 2 200 m – non chronométrée",
    desc: "Nés en 2012-2013. Départ 11h15. Inscription 3€.",
    img: "/images/Courses 4.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-2800",
    km: 2.8,
    name: "Course enfants 2 800 m – non chronométrée",
    desc: "Nés en 2010-2011. Départ 12h15. Inscription 3€.",
    img: "/images/Courses 5.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "adultes-5200",
    km: 5.2,
    name: "Course adultes 5 200 m – chronométrée",
    desc: "Ouvert aux coureurs nés en 2009 et avant. Départ 13h20. 8€.",
    img: "/images/Courses 6.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "adultes-10200",
    km: 10.2,
    name: "Course adultes 10 200 m – chronométrée",
    desc: "Ouvert aux coureurs nés en 2009 et avant. Départ 14h30. 10€.",
    img: "/images/Course 7.png",
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
