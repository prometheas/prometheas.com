"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialLinks } from "./SocialLinks";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/posts/", label: "Blog", match: "/posts" },
  { href: "/portfolio", label: "Portfolio", match: "/portfolio" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/contact", label: "Contact", match: "/contact" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[var(--bg-surface)] relative flex items-center justify-between px-[4.5rem] max-md:px-6 py-7 after:content-[''] after:absolute after:bottom-0 after:left-[4.5rem] after:right-[4.5rem] max-md:after:left-6 max-md:after:right-6 after:h-px after:bg-gradient-to-r after:from-[var(--accent)] after:from-[60px] after:to-[var(--border-subtle)] after:to-[60px]">
      <Link
        href="/"
        className="group text-[1.1rem] font-semibold tracking-[0.18em] uppercase text-[var(--text-primary)] no-underline hover:text-[var(--accent)] transition-colors"
      >
        Prometheas
        <span className="text-[var(--accent)] group-hover:text-[var(--text-primary)] font-bold transition-colors">
          .
        </span>
        com
      </Link>

      <nav className="hidden md:flex gap-2 lg:gap-5 items-center">
        {navLinks.map(({ href, label, match }) => {
          const active = pathname.startsWith(match);
          return (
            <Link
              key={href}
              href={href}
              className={`text-[0.78rem] font-[450] tracking-[0.1em] uppercase no-underline hover:text-[var(--accent)] transition-colors py-2 px-2 ${
                active ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>

      <SocialLinks className="hidden lg:flex" />
      <MobileNav />
    </header>
  );
}
