// components/SeoJsonLd.tsx
import Script from "next/script";

export default function SeoJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Trail des Vikings",
    url: "https://trail-brehal.fr",
    logo: "https://trail-brehal.fr/images/logo-brehal.png",
  };

  const event = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Trail des Vikings 2026",
    startDate: "2026-01-11",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Place Monaco, Saint-Martin-de-Bréhal 50290",
      address: "Saint-Martin-de-Bréhal 50290, France",
    },
    organizer: {
      "@type": "Organization",
      name: "Trail des Vikings",
      url: "https://trail-brehal.fr",
    },
    image: ["https://trail-brehal.fr/og.jpg"],
    url: "https://trail-brehal.fr",
  };

  return (
    <>
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <Script
        id="ld-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
      />
    </>
  );
}
