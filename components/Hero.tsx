"use client";

import FadeInWhenVisible from "./FadeInWhenVisible";

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
            <a
              href="/inscriptions"
              className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              S’inscrire
            </a>
            <a
              href="/parcours"
              className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Voir les parcours
            </a>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
