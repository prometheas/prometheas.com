import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { paginatedIndex, getAllPosts } from "@/lib/posts";
import { PostList } from "../../_components/PostList";

export function generateStaticParams() {
  const totalPages = Math.ceil(getAllPosts().length / 10);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return { title: `Blog — Page ${page}` };
}

export default async function PaginatedPosts({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  if (isNaN(pageNum) || pageNum < 1) notFound();

  const result = paginatedIndex(pageNum);
  if (pageNum > result.totalPages) notFound();

  return (
    <PostList
      title="Blog"
      posts={result.posts}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      baseUrl="/posts"
    />
  );
}
