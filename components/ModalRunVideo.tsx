"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string; // ex: "Parcours 10 km"
  src: string;
  poster?: string;
};

export default function ModalRunVideo({
  open,
  onClose,
  title,
  src,
  poster,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // Autoplay dès l'ouverture
    const t = setTimeout(async () => {
      try {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = 0;
        v.muted = true;
        await v.play();
      } catch {
        // fallback : l'utilisateur cliquera manuellement
      }
    }, 50);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";

      // Stop net à la fermeture
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Wrapper vidéo plein écran */}
      <div
        className="relative w-full h-full max-w-[1200px] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Vidéo */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-contain bg-black rounded-xl"
        />

        {/* Titre en haut à gauche */}
        {title && (
          <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-black/60 text-white font-extrabold text-sm md:text-base backdrop-blur">
            {title}
          </div>
        )}

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          aria-label="Fermer la vidéo"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white text-xl hover:bg-black/80 transition backdrop-blur"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
