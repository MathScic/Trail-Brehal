"use client";

import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import MerEtBocage from "@/components/MerEtBocage";

export default function Home() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <Hero />
      {/* SECTION : Un trail entre mer et bocage */}
      <MerEtBocage />
      {/* SECTION : Courses */}
      <Courses />
    </main>
  );
}
