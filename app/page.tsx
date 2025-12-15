// app/page.tsx
import type { Metadata } from "next";
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import MerEtBocage from "@/components/MerEtBocage";
import Partners from "@/components/Partners";
import SeoJsonLd from "@/components/SeoJsonLd";
import ChaussettesSection from "@/components/ChaussettesSection";
import RunVideo from "@/components/ModalRunVideo";

const SITE = "https://trail-des-vikings.fr";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Bienvenue sur le site officiel du Trail des Vikings à Bréhal (Manche, Normandie) : inscriptions, parcours, infos pratiques, partenaires et galerie photos.",
  alternates: { canonical: `${SITE}/` },
  openGraph: {
    title: "Trail des Vikings — Bréhal",
    description:
      "Participez au Trail des Vikings à Bréhal : courses nature entre mer et bocage, inscriptions en ligne et infos pratiques.",
    url: SITE,
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Trail des Vikings" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trail des Vikings — Bréhal",
    description:
      "Participez au Trail des Vikings à Bréhal : infos, inscriptions et courses nature en Normandie.",
    images: ["/og.jpg"],
  },
};

export default function Home() {
  return (
    <main className="bg-white flex-1">
      {/* HERO SECTION (doit contenir le <h1> principal du site) */}
      <Hero />

      {/* SECTION : Un trail entre mer et bocage */}
      <MerEtBocage />

      {/* SECTION : Courses */}
      <Courses />

      {/* SECTION : Vente chaussettes frères chaussettes */}
      <ChaussettesSection />

      {/* SECTION : Partenaires */}
      <Partners />

      {/* JSON-LD global (Organization + Event) */}
      <SeoJsonLd />
    </main>
  );
}
