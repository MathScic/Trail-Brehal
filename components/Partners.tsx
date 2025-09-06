"use client";

import Image from "next/image";
import Link from "next/link";
import partnersData from "@/data/partners.json";

type Partner = {
  name: string;
  logo: string; // ex: /images/partners/xxx.png
  href?: string; // optionnel
};

export default function Partners() {
  const partners = (partnersData as Partner[]) ?? [];

  return (
    <section
      aria-labelledby="partners-title"
      className="relative max-w-6xl mx-auto px-4 py-16"
    >
      <h2
        id="partners-title"
        className="text-2xl md:text-3xl font-bold text-blue-900 text-center"
      >
        Nos partenaires
      </h2>
      <div className="mt-3 h-0.5 w-16 bg-blue-900/20 mx-auto rounded" />

      {partners.length === 0 ? (
        <p className="mt-10 text-center text-blue-900/70">
          Les partenaires seront annoncés prochainement.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((p) => {
            const content = (
              <div className="group w-full aspect-[4/3] rounded-xl bg-white border border-gray-200 flex items-center justify-center p-4 hover:shadow-md transition">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={240}
                  height={160}
                  className="object-contain max-h-full max-w-full opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition"
                />
              </div>
            );
            return p.href ? (
              <Link
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Site de ${p.name}`}
              >
                {content}
              </Link>
            ) : (
              <div key={p.name}>{content}</div>
            );
          })}
        </div>
      )}
    </section>
  );
}
