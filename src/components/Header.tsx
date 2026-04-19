import Link from "next/link";
import { SocialLinks } from "./SocialLinks";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="flex items-center justify-between px-[4.5rem] max-md:px-6 py-7 relative after:content-[''] after:absolute after:bottom-0 after:left-[4.5rem] after:right-[4.5rem] max-md:after:left-6 max-md:after:right-6 after:h-px after:bg-gradient-to-r after:from-red after:from-[60px] after:to-slate-100 after:to-[60px]">
      <Link
        href="/"
        className="text-[1.1rem] font-semibold tracking-[0.18em] uppercase text-black no-underline"
      >
        Prometheas<span className="text-red font-bold">.</span>com
      </Link>

      <nav className="hidden md:flex gap-9 items-center">
        <Link
          href="/posts/"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-slate-700 no-underline hover:text-red transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/portfolio"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-slate-700 no-underline hover:text-red transition-colors"
        >
          Portfolio
        </Link>
        <Link
          href="/about"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-slate-700 no-underline hover:text-red transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-[0.78rem] font-[450] tracking-[0.1em] uppercase text-slate-700 no-underline hover:text-red transition-colors"
        >
          Contact
        </Link>
      </nav>

      <SocialLinks className="hidden md:flex" />
      <MobileNav />
    </header>
  );
}
