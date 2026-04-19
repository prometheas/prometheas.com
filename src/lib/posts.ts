import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PER_PAGE = 10;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  draft: boolean;
  id?: number;
  excerpt: string;
}

export interface PaginatedResult {
  posts: PostMeta[];
  totalPages: number;
  currentPage: number;
}

function extractExcerpt(content: string): string {
  // Strip MDX imports and component tags
  const cleaned = content
    .replace(/^import\s.*$/gm, "")
    .replace(/<[A-Z]\w+[^>]*\/>/g, "")
    .replace(/<[A-Z]\w+[^>]*>[\s\S]*?<\/[A-Z]\w+>/g, "")
    .replace(/<!--more-->/g, "")
    .trim();

  // Split into paragraphs (skip empty lines)
  const paragraphs = cleaned.split(/\n\n+/).filter((p) => {
    const trimmed = p.trim();
    return trimmed.length > 0 && !trimmed.startsWith("#") && !trimmed.startsWith("---");
  });

  if (paragraphs.length === 0) return "";

  const firstPara = paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`#]/g, "").trim();

  // First paragraph or first 3 sentences, whichever is shorter
  const sentences = firstPara.match(/[^.!?]+[.!?]+/g) || [firstPara];
  const threeOrFewer = sentences.slice(0, 3).join("").trim();

  return threeOrFewer.length < firstPara.length ? threeOrFewer : firstPara;
}

function getAllPostMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    const slug =
      data.slug || filename.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-/, "");

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString() : "",
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === "string"
          ? [data.tags]
          : [],
      draft: data.draft === true,
      id: data.id,
      excerpt: extractExcerpt(content),
    } satisfies PostMeta;
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

let _cache: PostMeta[] | null = null;
function cached(): PostMeta[] {
  if (!_cache) _cache = getAllPostMeta();
  return _cache;
}

export function getAllPosts(): PostMeta[] {
  return cached();
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return cached().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return cached().map((p) => p.slug);
}

export function paginate(posts: PostMeta[], page: number): PaginatedResult {
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const clamped = Math.max(1, Math.min(page, totalPages));
  const start = (clamped - 1) * PER_PAGE;

  return {
    posts: posts.slice(start, start + PER_PAGE),
    totalPages,
    currentPage: clamped,
  };
}

export function paginatedIndex(page: number): PaginatedResult {
  return paginate(cached(), page);
}

export function postsByYear(year: number): PostMeta[] {
  return cached().filter((p) => new Date(p.date).getFullYear() === year);
}

export function postsByCategory(category: string): PostMeta[] {
  const lower = category.toLowerCase();
  return cached().filter((p) =>
    p.categories.some((c) => c.toLowerCase() === lower)
  );
}

export function postsByTag(tag: string): PostMeta[] {
  const lower = tag.toLowerCase();
  return cached().filter((p) => p.tags.some((t) => t.toLowerCase() === lower));
}

export function allYears(): number[] {
  return [...new Set(cached().map((p) => new Date(p.date).getFullYear()))].sort(
    (a, b) => b - a
  );
}

export function allCategories(): string[] {
  return [...new Set(cached().flatMap((p) => p.categories))].sort();
}

export function allTags(): string[] {
  return [...new Set(cached().flatMap((p) => p.tags))].sort();
}
