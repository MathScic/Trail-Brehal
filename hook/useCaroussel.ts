// hooks/useCarousel.ts
"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function useCarousel<T>(
  items: T[],
  groupSize = 3,
  intervalMs = 4500
) {
  const slides = useMemo(() => {
    const res: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize)
      res.push(items.slice(i, i + groupSize));
    return res;
  }, [items, groupSize]);

  const slidesWithClone = useMemo(
    () => (slides.length ? [...slides, slides[0]] : ([[]] as T[][])),
    [slides]
  );

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const started = useRef(false);
  const logicalLength = slides.length;

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const raf = requestAnimationFrame(() => {
      timer.current = window.setInterval(
        () => setIndex((p) => p + 1),
        intervalMs
      );
    });
    return () => {
      cancelAnimationFrame(raf);
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [intervalMs]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = isAnimating
      ? "transform 900ms cubic-bezier(0.16,1,0.3,1)"
      : "none";
    track.style.transform = `translateX(-${index * 100}%)`;
  }, [index, isAnimating]);

  const onTransitionEnd = () => {
    if (index === slidesWithClone.length - 1) {
      setIsAnimating(false);
      requestAnimationFrame(() => {
        setIndex(0);
        requestAnimationFrame(() => setIsAnimating(true));
      });
    }
  };

  return {
    slides,
    slidesWithClone,
    logicalLength,
    index,
    setIndex,
    trackRef,
    onTransitionEnd,
  };
}
