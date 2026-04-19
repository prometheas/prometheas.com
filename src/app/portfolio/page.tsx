import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <section className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <h1 className="text-4xl max-md:text-3xl font-light text-[var(--text-primary)] mb-6">
        Portfolio
      </h1>
      <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light mb-12">
        A collection of my work, both professional and personal.
      </p>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
        <Link
          href="/portfolio/software"
          className="group block p-8 border border-[var(--border)] rounded hover:border-[var(--accent)] transition-colors no-underline"
        >
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2.5 group-hover:text-[var(--accent)] transition-colors">
            <span className="w-2 h-2 border-[1.5px] border-[var(--accent)] rounded-full shrink-0" />
            Software Projects
          </h2>
          <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
            Developer tools, browser extensions, and open source contributions
            spanning two decades.
          </p>
        </Link>

        <Link
          href="/portfolio/photography"
          className="group block p-8 border border-[var(--border)] rounded hover:border-[var(--accent)] transition-colors no-underline"
        >
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2.5 group-hover:text-[var(--accent)] transition-colors">
            <span className="w-2 h-2 border-[1.5px] border-[var(--accent)] rounded-full shrink-0" />
            Photography
          </h2>
          <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
            A small sampling of my photography work (hobby only).
          </p>
        </Link>
      </div>
    </section>
  );
}
