"use client";

import { useState } from "react";
import Link from "next/link";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prometheas",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/prometheas",
    icon: (
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/prometheas",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
];

const navLinks = [
  { href: "/posts/", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden relative z-[1001] w-7 h-5 bg-transparent border-none cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`block absolute left-0 w-full h-[2px] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open
              ? "top-[9px] rotate-45 bg-white"
              : "top-0 bg-black"
          }`}
        />
        <span
          className={`block absolute left-0 w-full h-[2px] top-[9px] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? "opacity-0 bg-white" : "bg-black"
          }`}
        />
        <span
          className={`block absolute left-0 w-full h-[2px] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open
              ? "top-[9px] -rotate-45 bg-white"
              : "top-[18px] bg-black"
          }`}
        />
      </button>

      <div
        className={`fixed inset-x-0 top-0 z-[1000] bg-red flex flex-col items-center justify-center gap-0 px-8 pt-20 pb-12 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8 mb-12">
          {navLinks.map((link, i) => {
            const className = `text-2xl font-light tracking-[0.2em] uppercase text-white no-underline transition-all duration-300 ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"
            }`;
            const style = { transitionDelay: open ? `${150 + i * 70}ms` : "0ms" };

            return "external" in link ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={className}
                style={style}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={className}
                style={style}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div
          className={`flex gap-6 transition-all duration-300 ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2.5"
          }`}
          style={{ transitionDelay: open ? "350ms" : "0ms" }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
