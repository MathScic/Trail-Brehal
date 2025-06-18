"use client";
import Image from "next/image";
import FadeInWhenVisible from "./FadeInWhenVisible";

export default function MerEtBocage() {
  return (
    <FadeInWhenVisible>
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
    </FadeInWhenVisible>
  );
}
