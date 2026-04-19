import Link from "next/link";
import { SocialLinks } from "./SocialLinks";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="bg-[var(--bg-surface)] flex items-center justify-between px-[4.5rem] max-md:px-6 py-7 relative after:content-[''] after:absolute after:bottom-0 after:left-[4.5rem] after:right-[4.5rem] max-md:after:left-6 max-md:after:right-6 after:h-px after:bg-gradient-to-r after:from-[var(--accent)] after:from-[60px] after:to-[var(--border-subtle)] after:to-[60px]">
      <Link
        href="/"
        className="text-[1.1rem] font-semibold tracking-[0.18em] uppercase text-[var(--text-primary)] no-underline"
      >
        Prometheas<span className="text-[var(--accent)] font-bold">.</span>com
      </Link>

      <nav className="hidden md:flex gap-9 items-center">
        <Link
          href="/posts/"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/portfolio"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          Portfolio
        </Link>
        <Link
          href="/about"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          Contact
        </Link>
        <ThemeToggle />
      </nav>

      <SocialLinks className="hidden md:flex" />
      <MobileNav />
    </header>
  );
}
