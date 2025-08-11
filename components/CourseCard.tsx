" use client";

import Image from "next/image";
import Link from "next/link";

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
    <article className="group rounded-2xl overflow-hidden bg-white/95 backdrop-blur border border-white/60 shadow-md transition hover:shadow-lg hover:-translate-y-0.5 text-center min-h-[400px]">
      <div className="relative w-full aspect-[16/9] rounded-t-2xl overflow-hidden bg-gray-100">
        <Image
          src={course.img}
          alt={`${course.km} km – ${course.name}`}
          fill
          priority={priority}
          className="object-cover"
          sizes={size === "sm" ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
          fill
        />
      </div>
      <div className="p-6 flex flex-col items-center">
        <h3
          className={`font-extrabold text-blue-800 tracking-tight ${
            size === "sm" ? "text-xl" : "text-xl md:text-2xl"
          }`}
        >
          {course.km} km - {course.name}
        </h3>
        <p className="text-gray-600 mt-2 text-center">{course.desc}</p>
        <Link
          href={course.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Inscription ${course.km} km – ${course.name}`}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          S’inscrire
        </Link>
      </div>
    </article>
  );
}
