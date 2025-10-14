"use client";

import Image from "next/image";
import Link from "next/link";

type Course = {
  km: string | number;
  name: string;
  desc: string;
  img: string;
  signupUrl: string;
};

export default function CourseCard({
  course,
  priority = false,
  size = "md",
}: {
  course: Course;
  priority?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white/95 backdrop-blur border border-white/60 shadow-md transition hover:shadow-lg hover:-translate-y-0.5 text-center h-[400px] flex flex-col">
      {/* Image ratio 16/10 */}
      <div className="relative w-full aspect-[16/10] bg-gray-100">
        <Image
          src={course.img}
          alt={`Course ${course.km} km – ${course.name}`}
          fill
          priority={priority}
          className="object-cover"
          sizes={
            size === "sm"
              ? "100vw"
              : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
        />
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1 items-center justify-between">
        <div>
          <h3
            className={`font-extrabold text-blue-800 tracking-tight ${
              size === "sm" ? "text-lg" : "text-xl md:text-2xl"
            } line-clamp-1`}
          >
            {(() => {
              const kmValue = String(course.km).trim().toLowerCase(); // normalisation
              const showKm = !kmValue.includes("m"); // si "m" → ne pas rajouter km
              return `${course.km}${showKm ? " km" : ""} – ${course.name}`;
            })()}
          </h3>

          <p className="text-gray-600 mt-2 text-center text-sm line-clamp-2">
            {course.desc}
          </p>
        </div>

        <Link
          href={course.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`S’inscrire à la course ${(() => {
            const kmValue = String(course.km).trim().toLowerCase();
            const showKm = !kmValue.includes("m");
            return `${course.km}${showKm ? " km" : ""}`;
          })()} – ${course.name}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          S’inscrire
        </Link>
      </div>
    </article>
  );
}
