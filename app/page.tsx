"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
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

      {/* SECTION : Un trail entre mer et bocage */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center text-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Un trail entre mer et bocage
          </h2>
          <p className="text-gray-700 text-2xl">
            Bienvenue sur le site de la Bréhalaise !<br />
            Participez à la prochaine édition de notre trail à Bréhal , et
            <br /> découvrez des parcours variés entre mer et bocage.
          </p>
        </div>
        <div>
          <Image
            src="/images/trail_mer_et_bocage.png" // mets ici l'image du coureur
            alt="Coureur en action"
            width={500}
            height={200}
            className="rounded-xl"
          />
        </div>
      </section>

      {/* SECTION : Courses */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">Courses</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/courses/5km"
            className="border rounded-xl p-8 shadow hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-blue-800">5 KM</h3>
            <p className="text-gray-600 mt-2">Course nature</p>
          </Link>
          <Link
            href="/courses/12km"
            className="border rounded-xl p-8 shadow hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-blue-800">12 KM</h3>
            <p className="text-gray-600 mt-2">Course nature</p>
          </Link>
          <Link
            href="/courses/21km"
            className="border rounded-xl p-8 shadow hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-blue-800">21 KM</h3>
            <p className="text-gray-600 mt-2">Course nature</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
