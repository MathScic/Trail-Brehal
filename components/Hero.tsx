"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FadeInWhenVisible from "./FadeInWhenVisible";

const IMAGES = [
  "/images/banner-1.jpeg",
  "/images/banner-4.jpg", // <-- mets le bon ext ici
  "/images/banner-3.jpeg",
];

const DURATION = 1.2; // fondu (s)
const INTERVAL = 5000; // 5s par image

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <FadeInWhenVisible>
      <section className="relative h-[100vh] w-full overflow-hidden text-white flex flex-col justify-center items-center text-center">
        {/* Pile d’images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={IMAGES[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION, ease: "easeInOut" }}
              className="absolute inset-0 will-change-opacity transform-gpu"
            >
              <Image
                src={IMAGES[index]}
                alt=""
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlay bleu au-dessus des images */}
        <div className="absolute inset-0 z-10 bg-[#0d1b33] opacity-60 pointer-events-none" />

        {/* Contenu au-dessus de tout */}
        <div className="relative z-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Trail des Vikings</h1>
          <p className="text-xl md:text-2xl mt-4">11 Janvier 2026</p>
          <p className="text-xl md:text-2xl mt-4">
            à St Martin de Bréhal 50290, Place Monaco
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <motion.a
              href="https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html"
              className="bg-blue-800 text-white px-6 py-3 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              S’inscrire
            </motion.a>
            <motion.a
              href="/courses"
              className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir les parcours
            </motion.a>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
