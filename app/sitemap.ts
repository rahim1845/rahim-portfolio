import type { MetadataRoute } from "next";
import { projects, playlist } from "@/lib/projects";

const BASE = "https://rahim1845.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/work`, lastModified: now, priority: 0.9 },
    ...projects.map((p) => ({ url: `${BASE}/work/${p.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${BASE}/playground`, lastModified: now, priority: 0.7 },
    ...playlist
      .filter((p) => p.slug)
      .map((p) => ({ url: `${BASE}/playground/${p.slug}`, lastModified: now, priority: 0.5 })),
    { url: `${BASE}/about`, lastModified: now, priority: 0.6 },
  ];
}
