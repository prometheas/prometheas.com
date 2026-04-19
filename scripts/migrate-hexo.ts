import fs from "fs";
import path from "path";
import matter from "gray-matter";

const hexoDir = process.argv[2];
if (!hexoDir) {
  console.error("Usage: npx tsx scripts/migrate-hexo.ts /path/to/hexo/repo");
  process.exit(1);
}

const postsDir = path.join(hexoDir, "source", "_posts");
const draftsDir = path.join(hexoDir, "source", "_drafts");
const imagesDir = path.join(hexoDir, "source", "images");
const outPostsDir = path.join(process.cwd(), "content", "posts");
const outImagesDir = path.join(process.cwd(), "public", "images", "blog");

// Ensure output directories exist
fs.mkdirSync(outPostsDir, { recursive: true });
fs.mkdirSync(outImagesDir, { recursive: true });

function slugFromFilename(filename: string): string {
  // Strip leading YYYY-MM- prefix and .md extension
  return filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-/, "");
}

function transformContent(content: string): string {
  let out = content;

  // Convert <div class="figure"> pattern to <Figure> component
  out = out.replace(
    /<div class="figure">\s*!\[([^\]]*)\]\(([^)]+)\)\s*(?:<span class="caption">([^<]*)<\/span>)?\s*<\/div>/g,
    (_match, alt: string, src: string, caption: string | undefined) => {
      const newSrc = src.replace(/^\/images\//, "/images/blog/");
      const captionAttr = caption ? ` caption="${caption}"` : "";
      const altAttr = alt ? ` alt="${alt}"` : "";
      return `<Figure src="${newSrc}"${altAttr}${captionAttr} />`;
    },
  );

  // Rewrite standalone image paths
  out = out.replace(/!\[([^\]]*)\]\(\/images\//g, "![$1](/images/blog/");

  // Convert Hexo code block syntax [#!lang] to standard fenced code blocks
  // Matches indented code blocks that start with [#!lang] or [#!lang N]
  out = out.replace(/^( {4})\[#!(\w+)(?:\s+\d+)?\]\n/gm, "```$2\n");

  // Remove <!--more--> markers
  out = out.replace(/<!--more-->/g, "");

  return out;
}

function migratePost(filepath: string, isDraft: boolean): void {
  const filename = path.basename(filepath);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  const slug = slugFromFilename(filename);

  // Normalize front matter
  const frontMatter: Record<string, unknown> = {
    title: data.title || slug,
    slug,
    draft: isDraft,
    categories: Array.isArray(data.categories) ? data.categories : [],
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
        ? [data.tags]
        : [],
  };

  if (data.date) {
    frontMatter.date = new Date(data.date).toISOString().split("T")[0];
  }
  if (data.id) frontMatter.id = data.id;

  const transformed = transformContent(content);
  const outContent = matter.stringify(transformed, frontMatter);
  const outFilename = `${filename.replace(/\.md$/, "")}.mdx`;

  fs.writeFileSync(path.join(outPostsDir, outFilename), outContent);
  console.log(`  ✓ ${outFilename}${isDraft ? " (draft)" : ""}`);
}

// Copy images
function copyImages(): void {
  if (!fs.existsSync(imagesDir)) {
    console.log("No images directory found, skipping.");
    return;
  }

  function copyRecursive(src: string, dest: string): number {
    let count = 0;
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        count += copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        count++;
      }
    }
    return count;
  }

  const count = copyRecursive(imagesDir, outImagesDir);
  console.log(`Copied ${count} images to public/images/blog/`);
}

// Run migration
console.log("Migrating published posts...");
const postFiles = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
for (const file of postFiles) {
  migratePost(path.join(postsDir, file), false);
}

if (fs.existsSync(draftsDir)) {
  console.log("\nMigrating drafts...");
  const draftFiles = fs.readdirSync(draftsDir).filter((f) => f.endsWith(".md"));
  for (const file of draftFiles) {
    migratePost(path.join(draftsDir, file), true);
  }
}

console.log("\nCopying images...");
copyImages();

console.log("\nMigration complete!");
