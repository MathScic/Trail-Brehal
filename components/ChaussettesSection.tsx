"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const images = ["/chaussette1.jpg", "/chaussette2.jpg", "/chaussette3.jpg"];

export default function SocksHighlight() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <FadeInWhenVisible>
      {/* Bandeau pleine largeur */}
      <section className="w-full bg-gray-100 py-18 pb-20 px-4 ">
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
          {/* Bloc image avec flèches */}
          <div className="relative md:w-1/2 w-full h-80 md:h-96">
            <Image
              src={images[index]}
              alt="Chaussettes Trail des Vikings"
              fill
              className="object-cover rounded-lg"
            />

            {/* Flèches navigation */}
            <button
              onClick={handlePrev}
              aria-label="Image précédente"
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-sm transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Image suivante"
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-sm transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Texte */}
          <div className="md:w-1/2 w-full p-6 md:p-10 text-gray-800">
            <h2 className="text-sm font-semibold text-orange-600 mb-2">
              🏃‍♂️ NOUVEAUTÉ 🧦
            </h2>
            <p className="font-medium mb-4">
              Cette année, on est fiers de vous annoncer notre partenariat avec{" "}
              <strong>Les Frères Chaussettes</strong>, une entreprise locale
              basée à Caen 🇫🇷 !
            </p>
            <p className="mb-3">
              ✨ Ensemble, on vous propose les{" "}
              <strong>chaussettes officielles du Trail des Vikings</strong> — un
              souvenir unique de votre course, alliant style, performance et
              confort.
            </p>
            <ul className="list-none space-y-1 mb-4">
              <li>
                🔥 <strong>Performantes :</strong> maintien, respirabilité et
                confort optimal.
              </li>
              <li>
                💪 <strong>Résistantes :</strong> prêtes à affronter tous vos
                entraînements.
              </li>
            </ul>
            <p className="text-sm text-gray-600">
              👉 Disponibles à la vente lors de votre inscription au Trail des
              Vikings.
              <br />
              Un souvenir utile, local et 100 % stylé !
            </p>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
