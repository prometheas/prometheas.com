import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) {
  if (totalPages <= 1) return null;

  function pageUrl(page: number): string {
    return page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
  }

  return (
    <nav className="flex items-center justify-center gap-6 pt-8 mt-4 border-t border-slate-100">
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="text-sm text-slate-700 no-underline hover:text-red transition-colors"
        >
          &larr; Newer
        </Link>
      ) : (
        <span className="text-sm text-slate-300">&larr; Newer</span>
      )}

      <span className="text-xs text-slate-400">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="text-sm text-slate-700 no-underline hover:text-red transition-colors"
        >
          Older &rarr;
        </Link>
      ) : (
        <span className="text-sm text-slate-300">Older &rarr;</span>
      )}
    </nav>
  );
}
