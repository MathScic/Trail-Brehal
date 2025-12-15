// app/courses/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import coursesData from "@/data/courses.json";
import RunVideo from "@/components/ModalRunVideo";

const SITE = "https://trail-des-vikings.fr";

type Course = {
  slug: string;
  km: number;
  name: string;
  desc: string;
  img: string;
  signupUrl: string;
  videoSrc?: string;
  poster?: string;
};

const allCourses = (coursesData as Course[]).filter(Boolean);

export function generateStaticParams() {
  return allCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = allCourses.find((c) => c.slug === slug);
  if (!course) return { title: "Course introuvable" };

  const title = `${course.km} km – ${course.name} | Trail des Vikings`;
  const description = course.desc;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/courses/${course.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/courses/${course.slug}`,
      images: [
        { url: course.img || "/og.jpg", width: 1200, height: 630, alt: title },
      ],
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = allCourses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 flex-1">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>
        <span> / </span>
        <Link href="/courses" className="hover:underline">
          Courses
        </Link>
        <span> / </span>
        <span className="text-gray-700">{course.km} km</span>
      </nav>

      <header className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            {course.km} km – {course.name}
          </h1>
          <p className="text-gray-700 mt-4">{course.desc}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={course.signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 transition"
            >
              S’inscrire
            </Link>
            <Link
              href="/courses"
              className="rounded-lg border border-gray-200 px-5 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              Retour aux courses
            </Link>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
          <Image
            src={course.img}
            alt={`${course.km} km – ${course.name}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </header>

      {course.videoSrc ? (
        <RunVideo
          title={`Vidéo du parcours — ${course.km} km`}
          src={course.videoSrc}
          poster={course.poster}
          autoplay={false}
        />
      ) : null}
    </main>
  );
}
