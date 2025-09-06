"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Empêcher le scroll du body quand la lightbox est ouverte
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (lbOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lbOpen]);

  // Fermer avec ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbOpen(false);
    };
    if (lbOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen]);

  const openLightbox = (i: number) => {
    setLbIndex(i);
    setLbOpen(true);
  };

  return (
    <section className="mt-10 first:mt-0">
      {/* Titre + flèche collée */}
      <div className="flex items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
          {title}
        </h2>
        <button
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
            transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.25, ease: "easeOut" }}
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
                    onClick={() => openLightbox(i)}
                    className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-white group"
                    aria-label="Voir en grand"
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="object-cover transition group-hover:scale-[1.02]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      priority={i < 2}
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
          >
            <div
              className="relative w-full max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()} // ne pas fermer en cliquant sur l'image
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setLbOpen(false)}
                aria-label="Fermer"
                className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl"
              >
                ✕
              </button>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
