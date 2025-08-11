"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import Header from "./Header";

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
    name: "Course enfants – non chronométrée",
    desc: "Nés en 2016-2017. Départ 10h00. Inscription 3€.",
    img: "/images/Courses1.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-1100",
    km: 1.1,
    name: "Course enfants – non chronométrée",
    desc: "Nés en 2014-2015. Départ 10h30. Inscription 3€.",
    img: "/images/Courses 3.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-2200",
    km: 2.2,
    name: "Course enfants – non chronométrée",
    desc: "Nés en 2012-2013. Départ 11h15. Inscription 3€.",
    img: "/images/Courses 4.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "enfants-2800",
    km: 2.8,
    name: "Course enfants – non chronométrée",
    desc: "Nés en 2010-2011. Départ 12h15. Inscription 3€.",
    img: "/images/Courses 5.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "adultes-5200",
    km: 5.2,
    name: "Course chronométrée",
    desc: "Ouvert aux coureurs nés en 2009 et avant. Départ 13h20. 8€.",
    img: "/images/Courses 6.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
  {
    slug: "adultes-10200",
    km: 10.2,
    name: "Course chronométrée",
    desc: "Ouvert aux coureurs nés en 2009 et avant. Départ 14h30. 10€.",
    img: "/images/Course 7.png",
    signupUrl:
      "https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html",
  },
];

const homeSelection = ["adultes-10200", "adultes-5200", "marche-5200"];

export default function Courses() {
  const ordered = useMemo(() => {
    const first = allCourses.filter((c) => homeSelection.includes(c.slug));
    const rest = allCourses.filter((c) => !homeSelection.includes(c.slug));
    return [...first, ...rest];
  }, []);

  const slides = useMemo(() => {
    const s1 = ordered.slice(0, 3);
    const s2 = ordered.slice(3, 6);
    const s3 = ordered.slice(6); // 1 carte
    return [s1, s2, s3];
  }, [ordered]);

  const slidesWithClone = useMemo(() => [...slides, slides[0]], [slides]);

  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const logicalLength = slides.length; // 3

  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => prev + 1), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // courbe + durée plus douce
    track.style.transition = isAnimating
      ? "transform 750ms cubic-bezier(0.22,1,0.36,1)"
      : "none";
    track.style.transform = `translateX(-${index * 100}%)`;
  }, [index, isAnimating]);

  const handleTransitionEnd = () => {
    if (index === slidesWithClone.length - 1) {
      setIsAnimating(false);
      requestAnimationFrame(() => {
        setIndex(0);
        requestAnimationFrame(() => setIsAnimating(true));
      });
    }
  };

  const goTo = (logicalIdx: number) => {
    setIsAnimating(true);
    setIndex(logicalIdx);
  };

  const currentDot = index === logicalLength ? 0 : index;

  return (
    <FadeInWhenVisible>
      <section className="relative">
        {/* Fond plage */}
        <div className="absolute inset-0">
          <Image
            src="/images/Img bréhal.jpeg"
            alt="Plage de Bréhal / Granville"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            Courses
          </h2>

          {/* CAROUSEL */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={trackRef}
              className="flex w-full will-change-transform" /* boost perf */
              onTransitionEnd={handleTransitionEnd}
            >
              {slidesWithClone.map((group, slideIdx) => {
                const isSingle = group.length === 1;
                return (
                  <div
                    key={slideIdx}
                    className={`shrink-0 w-full grid gap-6 ${
                      isSingle
                        ? "grid-cols-1 place-items-center"
                        : "md:grid-cols-3"
                    }`}
                  >
                    {group.map((c) => (
                      <article
                        key={c.slug}
                        className="group rounded-2xl overflow-hidden bg-white/95 backdrop-blur border border-white/60 shadow-md transition hover:shadow-lg hover:-translate-y-0.5 text-center"
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
                          <h3 className="text-xl md:text-2xl font-extrabold text-blue-800 tracking-tight">
                            {c.km} km – {c.name}
                          </h3>
                          <p className="text-gray-600 mt-2 text-center">
                            {c.desc}
                          </p>
                          <Link
                            href={c.signupUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Inscription ${c.km} km – ${c.name}`}
                            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                          >
                            S’inscrire
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: logicalLength }).map((_, i) => (
              <button
                key={i}
                aria-label={`Aller au slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition ${
                  currentDot === i
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/courses"
              className="text-white/95 underline underline-offset-4 hover:text-white"
            >
              Toutes les courses, ici
            </Link>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
