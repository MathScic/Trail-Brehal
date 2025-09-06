"use client";

import Link from "next/link";
import { useMemo } from "react";
import FadeInWhenVisible from "./FadeInWhenVisible";
import Backdrop from "../components/BackDrop";
import CourseCard from "@/components/CourseCard";
import useCarousel from "../hook/useCaroussel";
import coursesData from "@/data/courses.json";
import type { Course } from "@/types/course";
import Dots from "@/components/Dots";

const allCourses: Course[] = coursesData as Course[];
const homeSelection = ["adultes-10200", "adultes-5200", "marche-5200"];

export default function Courses() {
  // 1) Ordonner: priorités d’abord
  const ordered = useMemo(() => {
    const first = allCourses.filter((c) => homeSelection.includes(c.slug));
    const rest = allCourses.filter((c) => !homeSelection.includes(c.slug));
    return [...first, ...rest];
  }, []);

  // 2) Hook: slides (groupes de 3) + clones + animation smooth
  const {
    slides,
    slidesWithClone,
    logicalLength,
    index,
    setIndex,
    trackRef,
    onTransitionEnd,
  } = useCarousel(ordered, 3, 4500);

  const currentDot = index === logicalLength ? 0 : index;
  const topThree = ordered.slice(0, 3);

  return (
    <FadeInWhenVisible>
      <section className="relative">
        <Backdrop
          src="/images/courses-bg.jpeg"
          alt="Plage de Bréhal / Granville"
        />

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            Courses
          </h2>

          {/* Mobile: 3 cartes, pas de slider */}
          <div className="md:hidden">
            <div className="grid gap-6">
              {topThree.map((c, i) => (
                <CourseCard
                  key={c.slug}
                  course={c}
                  priority={i === 0}
                  size="sm"
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

          {/* Desktop/Tablet: slider */}
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl">
              <div
                ref={trackRef}
                className="flex w-full will-change-transform transform-gpu"
                onTransitionEnd={onTransitionEnd}
              >
                {slidesWithClone.map((group, slideIdx) => {
                  // Pad à 3 colonnes pour garder la même largeur/hauteur et centrer
                  const filled = (() => {
                    if (group.length === 1) return [null, group[0], null];
                    if (group.length === 2) return [group[0], group[1], null];
                    return group.slice(0, 3);
                  })();

                  const isFirstSlide = slideIdx === 0;

                  return (
                    <div
                      key={slideIdx}
                      className="shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {filled.map((c, i) =>
                        c ? (
                          <div
                            key={c.slug}
                            className="w-full max-w-[420px] mx-auto"
                          >
                            <CourseCard course={c} priority={isFirstSlide} />
                          </div>
                        ) : (
                          // Placeholder invisible gardant l'espace (même gabarit)
                          <div
                            key={`ph-${i}`}
                            aria-hidden
                            className="w-full max-w-[420px] mx-auto h-[400px] rounded-2xl opacity-0 pointer-events-none"
                          />
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Dots
              count={logicalLength}
              active={currentDot}
              onSelect={setIndex}
            />

            <div className="mt-8">
              <Link
                href="/courses"
                className="text-white/95 underline underline-offset-4 hover:text-white"
              >
                Toutes les courses, ici
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
