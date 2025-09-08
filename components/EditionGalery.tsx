"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function EditionGallery({
  id,
  title,
  photos,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  photos: Photo[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Réduit les animations si l’utilisateur le souhaite
  const prefersReducedMotion = useReducedMotion();
  const anim = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" };

  // Empêcher le scroll du body quand la lightbox est ouverte
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (lbOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lbOpen]);

  // Focus management: focus sur "Fermer" à l’ouverture + retour au déclencheur à la fermeture
  useEffect(() => {
    if (lbOpen) {
      closeBtnRef.current?.focus();
    } else {
      lastTriggerRef.current?.focus();
      lastTriggerRef.current = null;
    }
  }, [lbOpen]);

  // Clavier: ESC pour fermer, flèches pour naviguer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lbOpen) return;
      if (e.key === "Escape") setLbOpen(false);
      if (e.key === "ArrowRight") setLbIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setLbIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    if (lbOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen, photos.length]);

  const openLightbox = (i: number, triggerEl: HTMLElement | null) => {
    setLbIndex(i);
    lastTriggerRef.current = triggerEl;
    setLbOpen(true);
  };

  const prev = () => setLbIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setLbIndex((i) => (i + 1) % photos.length);

  return (
    <section className="mt-10 first:mt-0" aria-labelledby={`gal-title-${id}`}>
      {/* Titre + flèche collée */}
      <div className="flex items-center">
        <h2
          id={`gal-title-${id}`}
          className="text-2xl md:text-3xl font-bold text-blue-900"
        >
          {title}
        </h2>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="ml-2 inline-flex items-center justify-center rounded-lg p-2 hover:bg-blue-50 transition"
          aria-expanded={open}
          aria-controls={`galerie-${id}`}
          aria-label={open ? "Masquer les photos" : "Afficher les photos"}
        >
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </motion.svg>
        </button>
      </div>

      {/* Trait décoratif */}
      <div className="mt-3 h-0.5 w-20 bg-blue-900/20 rounded" />

      {/* Bloc dépliant */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`galerie-${id}`}
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={anim}
            className="overflow-hidden origin-top"
          >
            {photos.length === 0 ? (
              <p className="mt-8 text-blue-900/70">
                Les photos seront publiées prochainement.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={(e) => openLightbox(i, e.currentTarget)}
                    className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    aria-label={`Agrandir l’image : ${p.alt || "photo"}`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="object-cover transition group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={false}
                    />
                    <span className="sr-only">Agrandir l’image</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lbOpen && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setLbOpen(false)} // clic backdrop = fermer
            role="dialog"
            aria-modal="true"
            aria-labelledby={`lb-title-${id}`}
          >
            <div
              className="relative w-full max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()} // ne pas fermer sur l'image
            >
              {/* Bouton fermer */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setLbOpen(false)}
                aria-label="Fermer la visionneuse"
                className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ✕
              </button>

              {/* Titre sr-only pour aria-labelledby */}
              <h3 id={`lb-title-${id}`} className="sr-only">
                Visionneuse de la galerie « {title} »
              </h3>

              {/* Contrôles précédent/suivant */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Photo précédente"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-[101] rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Photo suivante"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-[101] rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="relative w-full h-[60vh] sm:h-[75vh]">
                <Image
                  src={photos[lbIndex].src}
                  alt={photos[lbIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Légende (utile SEO/a11y) */}
              {photos[lbIndex].alt && (
                <p className="mt-3 text-center text-white/90 text-sm">
                  {photos[lbIndex].alt}{" "}
                  <span className="opacity-70">
                    ({lbIndex + 1}/{photos.length})
                  </span>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
