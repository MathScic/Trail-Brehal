// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        {/* Logo */}
        <img
          src="/images/logo-bréhal.png"
          alt="Logo La Bréhalaise"
          width={100}
          height={100}
        />

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <a href="mailto:trail.brehal@email.com">trail.brehal@email.com</a>
          <p>06 12 34 56 78</p>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="#">
              <span className="hover:text-blue-400">Facebook</span>
            </Link>
            <Link href="#">
              <span className="hover:text-blue-400">Instagram</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} La Bréhalaise. Tous droits réservés.
      </div>
    </footer>
  );
}
