import { permanentRedirect } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function OldPostRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) permanentRedirect("/posts");

  permanentRedirect(`/posts/${post.year}/${post.month}/${post.slug}`);
}
