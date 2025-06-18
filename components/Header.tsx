"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle =
    "relative font-semibold text-white transition-all duration-300 hover:text-blue-300 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full";

  return (
    <motion.header
      className="absolute top-0 left-0 w-full z-50 text-white"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Barre principale */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-5 flex items-center justify-between md:justify-center">
        {/* NAVIGATION CENTRALE ÉQUILIBRÉE */}
        <div className="hidden md:flex w-[80%] justify-between items-center mx-auto">
          {/* Liens gauche */}
          <div className="flex gap-40">
            <Link href="/parcours" className={navLinkStyle}>
              Parcours
            </Link>
            <Link href="/infos-pratiques" className={navLinkStyle}>
              Infos
            </Link>
          </div>

          {/* Liens droite */}
          <div className="flex gap-40">
            <Link href="/inscriptions" className={navLinkStyle}>
              Inscriptions
            </Link>
            <Link href="/galerie" className={navLinkStyle}>
              Galerie
            </Link>
          </div>
        </div>

        {/* LOGO CENTRÉ */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <img
            src="/images/logo.png"
            alt="Logo La Bréhalaise"
            width={80}
            height={80}
            className="object-contain mt-2 md:mt-2 pt-2"
          />
        </Link>

        {/* BURGER MENU (mobile) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden absolute top-5 right-4 z-50 focus:outline-none"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-blue-800"></div>
            <div className="w-6 h-0.5 bg-blue-800"></div>
            <div className="w-6 h-0.5 bg-blue-800"></div>
          </div>
        </button>
      </div>

      {/* MENU MOBILE SLIDE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-blue-900 text-white shadow-lg z-40 p-6 space-y-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="font-bold text-right w-full"
            >
              ✕ Fermer
            </button>
            <Link
              href="/parcours"
              onClick={() => setMenuOpen(false)}
              className="block font-semibold"
            >
              Parcours
            </Link>
            <Link
              href="/infos-pratiques"
              onClick={() => setMenuOpen(false)}
              className="block font-semibold"
            >
              Infos
            </Link>
            <Link
              href="/inscriptions"
              onClick={() => setMenuOpen(false)}
              className="block font-semibold"
            >
              Inscriptions
            </Link>
            <Link
              href="/galerie"
              onClick={() => setMenuOpen(false)}
              className="block font-semibold"
            >
              Galerie
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
