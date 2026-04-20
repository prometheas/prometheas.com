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
    <nav className="flex items-center justify-center gap-6 pt-8 mt-4 border-t border-[var(--border-subtle)]">
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          &larr; Newer
        </Link>
      ) : (
        <span className="text-sm text-[var(--text-muted)]">&larr; Newer</span>
      )}

      <span className="text-xs text-[var(--text-muted)]">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          Older &rarr;
        </Link>
      ) : (
        <span className="text-sm text-[var(--text-muted)]">Older &rarr;</span>
      )}
    </nav>
  );
}
