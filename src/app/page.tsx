import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center text-center">
        <div className="w-full leading-[0] text-[0]">
          <Image
            src="/images/hero-hand.png"
            alt="Open hand, palm up — the Promethean offering"
            width={1920}
            height={1200}
            priority
            className="w-full h-auto block"
          />
        </div>

        <div className="px-[4.5rem] max-md:px-6 pb-20 max-md:pb-12 pt-12 max-md:pt-8">
          <div className="text-[0.8rem] tracking-[0.25em] uppercase text-[var(--accent)] font-medium mb-8">
            Prometheas.com
          </div>
          <h1 className="text-5xl max-md:text-[2.2rem] font-light leading-tight text-[var(--text-primary)] mb-2">
            <strong className="font-semibold">John</strong> Lianoglou
          </h1>
          <p className="text-[1.05rem] text-[var(--text-muted)] max-w-[520px] leading-[1.8] font-light mt-6 mx-auto">
            Humanistic technologist. Software architect. Open source contributor
            since the early days. Building thoughtful things that serve people.
          </p>
        </div>
      </section>

      {/* Columns */}
      <section className="max-w-[1200px] mx-auto px-[4.5rem] max-md:px-6 pb-24 max-md:pb-16">
        {/* Ornament divider */}
        <div className="flex items-center gap-6 mb-14">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <div className="text-[0.7rem] tracking-[0.15em] text-[var(--text-muted)] uppercase">
            &middot; &middot; &middot;
          </div>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div className="grid grid-cols-3 max-md:grid-cols-1">
          <Column title="Projects Portfolio">
            <p>
              Just a collection of my own software projects, both current and
              archival (I&apos;ve been at this software making stuff for a
              minute).
            </p>
            <p className="mt-4">
              So far, I&apos;ve ported over my{" "}
              <Link href="/portfolio/software" className="text-[var(--accent)] no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity">
                software projects
              </Link>{" "}
              showcase and a small sampling of my{" "}
              <Link href="/portfolio/photography" className="text-[var(--accent)] no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity">
                photography
              </Link>{" "}
              work (hobby only).
            </p>
          </Column>

          <Column title="Uncarved Blog">
            <p>
              <Link
                href="/posts/"
                className="text-[var(--accent)] no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
              >
                Uncarved
              </Link>{" "}
              is my personal blog, which tends to focus on tech and design, with
              particular interest in exploring how design can contribute to a
              more fruitful human experience.
            </p>
            <p className="mt-4">Really, I just enjoy writing.</p>
            <p className="mt-4">
              Its name is a reference to{" "}
              <a
                href="http://en.wikipedia.org/wiki/Uncarved_block#Pu"
                className="text-[var(--accent)] no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                the uncarved block
              </a>
              , an ancient Taoist metaphor representing pure potential, also
              commonly associated with <em>shoshin</em> or
              &ldquo;beginner&apos;s mind&rdquo;.
            </p>
          </Column>

          <Column title="Stalk Me Online" last>
            <p>
              You&apos;ll find direct links to my LinkedIn, Github, and other
              social profiles in the header and footer of this site. And the
              best way to get in touch is through{" "}
              <Link href="/contact" className="text-[var(--accent)] no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity">
                this Contact form
              </Link>
              .
            </p>
          </Column>
        </div>
      </section>
    </>
  );
}

function Column({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`py-10 px-12 max-md:px-0 max-md:py-8 relative ${
        !last
          ? "max-md:border-b max-md:border-[var(--border-subtle)] after:max-md:hidden after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-gradient-to-b after:from-transparent after:via-[var(--border)] after:to-transparent"
          : ""
      }`}
    >
      <h2 className="text-[1.15rem] font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2.5">
        <span className="w-2 h-2 border-[1.5px] border-[var(--accent)] rounded-full shrink-0" />
        {title}
      </h2>
      <div className="text-[0.92rem] text-[var(--text-secondary)] leading-[1.8] font-light">
        {children}
      </div>
    </div>
  );
}
