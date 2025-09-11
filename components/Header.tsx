// components/Header.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import coursesData from "@/data/courses.json";

type Course = {
  slug: string;
  km: number;
  name: string;
  desc: string;
  img: string;
  signupUrl: string;
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [parcoursOpen, setParcoursOpen] = useState(false);

  const courses = coursesData as Course[];
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinkStyle =
    "relative font-semibold text-white transition-all duration-300 hover:text-blue-300 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full";

  return (
    <motion.header
      className={`top-0 left-0 w-full z-50 ${
        isHome
          ? "absolute bg-transparent text-white"
          : "relative text-white shadow-sm"
      }`}
      style={!isHome ? { background: "oklch(21% 0.034 264.665)" } : {}}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Barre principale */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-7 flex items-center justify-between md:justify-center">
        {/* NAVIGATION CENTRALE */}
        <div className="hidden md:flex w-[80%] justify-between items-center mx-auto">
          {/* Liens gauche */}
          <div className="flex gap-40">
            {/* === PARCOURS + DROPDOWN (DESKTOP) === */}
            <div
              className="relative"
              onMouseEnter={() => setParcoursOpen(true)}
              onMouseLeave={() => setParcoursOpen(false)}
              onFocus={() => setParcoursOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setParcoursOpen(false);
                }
              }}
            >
              <button
                className={`${navLinkStyle} inline-flex items-center gap-2`}
                aria-haspopup="true"
                aria-expanded={parcoursOpen}
                aria-controls="menu-parcours"
              >
                Parcours
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  className="pointer-events-none"
                  aria-hidden="true"
                  animate={{ rotate: parcoursOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </motion.svg>
              </button>

              {/* Dropdown panel animé */}
              <AnimatePresence>
                {parcoursOpen && (
                  <motion.div
                    id="menu-parcours"
                    role="menu"
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-72 rounded-xl bg-white text-blue-900 shadow-lg border border-gray-200 p-2 z-[60] overflow-hidden origin-top"
                  >
                    <Link
                      href="/courses"
                      className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium"
                      role="menuitem"
                    >
                      Tous les parcours
                    </Link>
                    <div className="my-2 h-px bg-gray-200" />
                    <ul className="max-h-[60vh] overflow-auto">
                      {courses.map((c) => (
                        <li key={c.slug}>
                          <a
                            href={c.signupUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100"
                            role="menuitem"
                          >
                            {c.km} km – {c.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/infos-pratiques" className={navLinkStyle}>
              Infos
            </Link>
          </div>

          {/* Liens droite */}
          <div className="flex gap-40">
            <Link
              href="https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html"
              className={navLinkStyle}
            >
              Inscriptions
            </Link>
            <Link href="/galerie" className={navLinkStyle}>
              Galerie
            </Link>
          </div>
        </div>

        {/* LOGO CENTRÉ */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/logo-brehal.png"
            alt="Logo La Bréhalaise"
            width={90}
            height={90}
            className="object-contain"
            priority={false}
          />
        </Link>

        {/* BURGER MENU (mobile) — masqué quand ouvert */}
        {!menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden absolute top-6 right-4 z-50 focus:outline-none"
            aria-label="Ouvrir le menu"
            aria-expanded={false}
            aria-controls="mobile-menu"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        )}
      </div>

      {/* MENU MOBILE SLIDE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-blue-900 text-white shadow-lg z-40 p-6 space-y-4 overflow-auto"
            aria-label="Menu mobile"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="font-bold text-right w-full"
              aria-label="Fermer le menu"
            >
              ✕ Fermer
            </button>

            <Link
              href="/courses"
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
              href="https://www.normandiecourseapied.com/fiches-course-foulees-cross-trail-normandie-2025/manche/run-des-vikings-brehal-2025.html"
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
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
