import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// TODO: mets ton domaine prod ici (https://exemple.fr)
const SITE_URL = "https://trail-brehal.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trail des Vikings — Bréhal",
    template: "%s — Trail des Vikings",
  },
  description: "Site officiel du Trail des Vikings (Bréhal).",
  alternates: {
    canonical: "/", // les pages pourront surcharger leur canonical si besoin
  },
  icons: {
    icon: "/images/logo-brehal.png", // fichier dans /public/images/
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Trail des Vikings — Bréhal",
    description: "Site officiel du Trail des Vikings (Bréhal).",
    url: "/",
    siteName: "Trail des Vikings",
    type: "website",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Trail des Vikings" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trail des Vikings — Bréhal",
    description: "Site officiel du Trail des Vikings (Bréhal).",
    images: ["/og.jpg"],
  },
  themeColor: "#0d1b33",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-[100dvh] bg-white flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
