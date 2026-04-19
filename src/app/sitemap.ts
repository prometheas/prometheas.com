import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prometheas.com";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/portfolio/software`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/portfolio/photography`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.75 },
  ];
}
