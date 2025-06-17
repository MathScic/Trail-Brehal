"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Logo La Bréhalaise"
            width={50}
            height={50}
          />
        </Link>

        {/* Menu Nav */}
        <nav className="space-x-4 hidden md:block">
          <Link
            href="/"
            className="text-blue-800 font-semibold hover:underline"
          >
            Accueil
          </Link>
          <Link
            href="/parcours"
            className="text-blue-800 font-semibold hover:underline"
          >
            Parcours
          </Link>
          <Link
            href="/infos-pratiques"
            className="text-blue-800 font-semibold hover:underline"
          >
            Infos-Pratiques
          </Link>
          <Link
            href="/inscriptions"
            className="text-blue-800 font-semibold hover:underline"
          >
            Inscriptions
          </Link>
          <Link
            href="/galerie"
            className="text-blue-800 font-semibold hover:underline"
          >
            Galerie
          </Link>
        </nav>

        {/* Burger menu (mobile) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden focus:outline-none"
        >
          {" "}
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-blue-800"></div>
            <div className="w-6 h-0.5 bg-blue-800"></div>
            <div className="w-6 h-0.5 bg-blue-800"></div>
          </div>
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-blue-900 shadow-lg z-40 p-6 space-y-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white font-bold text-right w-full"
            >
              ✕ Fermer
            </button>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-whitefont-semibold"
            >
              Accueil
            </Link>
            <Link
              href="/parcours"
              onClick={() => setMenuOpen(false)}
              className="block text-white font-semibold"
            >
              Parcours
            </Link>
            <Link
              href="/infos-pratiques"
              onClick={() => setMenuOpen(false)}
              className="block text-white font-semibold"
            >
              Infos
            </Link>
            <Link
              href="/inscriptions"
              onClick={() => setMenuOpen(false)}
              className="block text-white font-semibold"
            >
              Inscriptions
            </Link>
            <Link
              href="/galerie"
              onClick={() => setMenuOpen(false)}
              className="block text-white font-semibold"
            >
              Galerie
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
