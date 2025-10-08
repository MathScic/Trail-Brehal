import type { MetadataRoute } from "next";

const SITE_URL = "https://trail-des-vikings.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "", // page d’accueil
    "inscriptions",
    "infos-pratiques",
    "courses",
    "parcours",
    "contact",
    "faq",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
