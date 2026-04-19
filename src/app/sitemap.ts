import type { MetadataRoute } from "next";
import { getAllPosts, allCategories, allTags, allYears } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prometheas.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/portfolio/software`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/portfolio/photography`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.75 },
    { url: `${baseUrl}/posts`, lastModified: new Date(), priority: 0.8 },
  ];

  const postPages = getAllPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.year}/${post.month}/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  const yearPages = allYears().map((y) => ({
    url: `${baseUrl}/posts/year/${y}`,
    lastModified: new Date(),
    priority: 0.4,
  }));

  const categoryPages = allCategories().map((c) => ({
    url: `${baseUrl}/posts/category/${c.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.4,
  }));

  const tagPages = allTags().map((t) => ({
    url: `${baseUrl}/posts/tag/${t.toLowerCase()}`,
    lastModified: new Date(),
    priority: 0.3,
  }));

  return [...staticPages, ...postPages, ...yearPages, ...categoryPages, ...tagPages];
}
