"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Course } from "@/types/course";

// Hook custom : carrousel infini fluide
export default function useCarousel(
  items: Course[],
  perSlide = 3,
  interval = 4500
) {
  // 1) Grouper par X
  const slides = useMemo(() => {
    const arr: Course[][] = [];
    for (let i = 0; i < items.length; i += perSlide) {
      arr.push(items.slice(i, i + perSlide));
    }
    return arr;
  }, [items, perSlide]);

  const logicalLength = slides.length;

  // 2) Clones tête + queue
  const slidesWithClone = useMemo(() => {
    if (logicalLength === 0) return [];
    const head = slides[0];
    const tail = slides[logicalLength - 1];
    return [tail, ...slides, head];
  }, [slides, logicalLength]);

  // 3) Index réel
  const [idx, setIdx] = useState(1);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const transitioningRef = useRef(false);

  const enableTransition = useCallback(() => {
    const el = trackRef.current;
    if (el) el.style.transition = "transform 550ms ease-in-out";
  }, []);
  const disableTransition = useCallback(() => {
    const el = trackRef.current;
    if (el) el.style.transition = "none";
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const el = trackRef.current;
      if (!el) return;
      transitioningRef.current = true;
      enableTransition();
      setIdx(next);
      el.style.transform = `translateX(${-100 * next}%)`;
    },
    [enableTransition]
  );

  const next = useCallback(() => goTo(idx + 1), [goTo, idx]);

  // Auto-play
  useEffect(() => {
    if (logicalLength <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval, logicalLength]);

  // Wrap invisible
  const onTransitionEnd = useCallback(() => {
    const el = trackRef.current;
    if (!el || !transitioningRef.current) return;
    transitioningRef.current = false;

    if (idx === logicalLength + 1) {
      disableTransition();
      setIdx(1);
      el.style.transform = `translateX(-100%)`;
      // @ts-ignore
      el.offsetHeight;
      enableTransition();
    }

    if (idx === 0) {
      disableTransition();
      setIdx(logicalLength);
      el.style.transform = `translateX(${-100 * logicalLength}%)`;
      // @ts-ignore
      el.offsetHeight;
      enableTransition();
    }
  }, [idx, logicalLength, disableTransition, enableTransition]);

  // Init position
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    disableTransition();
    el.style.transform = `translateX(-100%)`;
    // @ts-ignore
    el.offsetHeight;
    enableTransition();
  }, [disableTransition, enableTransition]);

  return {
    slides,
    slidesWithClone,
    logicalLength,
    index: idx - 1,
    setIndex: (logicalIndex: number) => goTo(logicalIndex + 1),
    trackRef,
    onTransitionEnd,
    next,
  };
}
