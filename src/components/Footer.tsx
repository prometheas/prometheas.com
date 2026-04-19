import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="text-center px-[4.5rem] max-md:px-6 pt-10 pb-12 relative before:content-[''] before:absolute before:top-0 before:left-[4.5rem] before:right-[4.5rem] max-md:before:left-6 max-md:before:right-6 before:h-px before:bg-[var(--border-subtle)]">
      <SocialLinks className="justify-center mb-3" />
      <p className="text-xs text-[var(--text-muted)] font-light">
        All material copyright &copy; 2001&ndash;{new Date().getFullYear()} John
        Lianoglou, unless otherwise noted.
      </p>
    </footer>
  );
}
