"use client";

import FadeInWhenVisible from "./FadeInWhenVisible";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <FadeInWhenVisible>
      <section className="relative h-[100vh] w-full bg-[url('/images/trail_brehal_banner.png')] bg-cover bg-center text-white flex flex-col justify-center items-center text-center">
        {/* Overlay bleu */}
        <div className="absolute inset-0 bg-[#0d1b33] opacity-60 z-0"></div>

        {/* Contenu */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Trail de Bréhal</h1>
          <p className="text-xl md:text-2xl mt-4">8 septembre 2024</p>
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
              href="/parcours"
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
