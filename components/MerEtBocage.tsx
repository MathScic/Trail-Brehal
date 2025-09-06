"use client";
import Image from "next/image";
import FadeInWhenVisible from "./FadeInWhenVisible";

export default function MerEtBocage() {
  return (
    <FadeInWhenVisible>
      <section className="py-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Un trail entre mer et bocage
          </h2>
          <p className="text-gray-700 text-lg max-w-xl mb-6 leading-relaxed">
            Bienvenue sur le site du trail des Vikings organisé par le club de
            la Bréhalaise !<br />
            Participez à la prochaine édition de notre trail à Bréhal et
            découvrez des parcours variés entre mer et bocage.
          </p>
          <a
            href="/inscription"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Inscription
          </a>
        </div>

        {/* Image + bulles */}
        <div className="relative flex justify-center">
          <Image
            src="/images/banner-2.jpg"
            alt="Coureur en action"
            width={440}
            height={300}
            className="rounded-xl object-cover"
          />

          {/* Bulle 1 */}
          <div
            className="absolute rounded-full bg-[#1E3A8A] text-white shadow-lg px-6 py-4 text-center flex flex-col items-center justify-center"
            style={{ top: "20px", left: "20px" }}
          >
            <span className="block text-lg font-bold leading-none">800</span>
            <span className="block text-xs font-medium leading-tight">
              participants
            </span>
          </div>

          {/* Bulle 2 */}
          <div
            className="absolute rounded-full bg-[#2563EB] text-white shadow-lg px-6 py-4 text-center flex flex-col items-center justify-center"
            style={{ top: "40px", right: "20px" }}
          >
            <span className="block text-lg font-bold leading-none">10e</span>
            <span className="block text-xs font-medium leading-tight">
              éditions
            </span>
          </div>

          {/* Bulle 3 */}
          <div
            className="absolute rounded-full bg-[#38BDF8] text-white shadow-lg px-6 py-4 text-center flex flex-col items-center justify-center"
            style={{ bottom: "20px", right: "28px" }}
          >
            <span className="block text-lg font-bold leading-none">3</span>
            <span className="block text-xs font-medium leading-tight">
              courses
            </span>
            <span className="block text-xs font-medium leading-tight">
              programmées
            </span>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
