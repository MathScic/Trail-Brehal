import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Trail de Bréhal",
  description: "Le site pour le trail de Bréhal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
