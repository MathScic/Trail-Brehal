// components/Footer.tsx
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        {/* Logo */}
        <Image
          src="/images/logo-brehal.png"
          alt="Logo Trail des Vikings"
          width={100}
          height={100}
          priority={false}
        />

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <a href="mailto:letraildesvikings50@gmail.com">
            letraildesvikings50@gmail.com
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://www.instagram.com/letraildesvikings"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — letraildesvikings (nouvel onglet)"
              className="inline-flex items-center gap-2 hover:text-blue-400"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8z"
                />
              </svg>
              <span>@letraildesvikings</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Trail des Vikings. Tous droits
        réservés.
      </div>
    </footer>
  );
}
