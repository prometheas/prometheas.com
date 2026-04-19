import type { Metadata } from "next";

export const metadata: Metadata = { title: "Software Projects" };

export default function SoftwarePage() {
  return (
    <section className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <h1 className="text-4xl max-md:text-3xl font-light text-[var(--text-primary)] mb-6">
        Software Projects
      </h1>
      <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light mb-12">
        Here&apos;s an overview of some projects I&apos;ve been working on in my
        spare time, both contemporary and back into the archives.
      </p>

      <ProjectSection title="Developer Tools">
        <Project
          name="TDD Kata Generator"
          href="https://github.com/prometheas/generator-multistack-tdd-kata"
        >
          This is a{" "}
          <a
            href="http://yeoman.io"
            className="text-[var(--accent)] hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yeoman
          </a>{" "}
          generator that quickly creates an empty TDD kata project. The
          generator allows you to pick any of several katas, and allows you to
          pick from multiple languages and testing frameworks. It also also
          designed such that it is ready to accept additional katas, languages,
          and testing frameworks. Install it and get your TDD on.
        </Project>
      </ProjectSection>

      <ProjectSection title="Browser Extensions">
        <Project
          name="JIRA to OmniFocus"
          href="https://chrome.google.com/webstore/detail/jira-to-omnifocus/engmpfhepafobaopljohdkogmbbhcaeo"
        >
          for Chrome (
          <a
            href="https://github.com/prometheas/jira-2-omnifocus"
            className="text-[var(--accent)] hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github repo
          </a>
          ). This extension adds a big, lovely <em>Send to OmniFocus</em> button
          atop the right column of a JIRA ticket page, which&mdash;when
          clicked&mdash;creates a OmniFocus task populated with details from the
          JIRA ticket. The extension also supports Mail Drop, so you can send
          items to your OmniFocus Inbox even if you haven&apos;t got OmniFocus
          installed on this computer. (Yes, even from Linux or Windows.)
        </Project>
      </ProjectSection>

      <ProjectSection title="Deprecated and Obsolete">
        <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light mb-6">
          These are my older and, frankly, obsolete projects. They show a much
          less experienced man&apos;s skills, but I keep them around because
          they offer historical record that I&apos;ve been writing software as a
          hobby and releasing OSS for years. As rough their edges and long in
          the tooth, I&apos;m still rather proud of what they represent.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <li>
            <a
              href="http://www.symfony-project.org/plugins/sfPropelLazyHydrationIteratorPlugin"
              className="text-[var(--accent)] hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              sfPropelLazyHydrationIteratorPlugin
            </a>
          </li>
          <li>
            <a
              href="http://www.symfony-project.org/plugins/sfRESTClientPlugin"
              className="text-[var(--accent)] hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              sfRESTClientPlugin
            </a>
          </li>
          <li>
            <a
              href="https://sourceforge.net/projects/rosettastone/"
              className="text-[var(--accent)] hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rosetta Stone Library
            </a>
            . A Swing (yep, Java) library that offered the ability to map
            keystrokes to unicode characters when typing into text areas.
            Language keyboards have been available at the OS level since the
            mid-aughts, so this has become entirely useless.
          </li>
          <li>
            <a
              href="https://sourceforge.net/projects/awusbxtra/?source=directory"
              className="text-[var(--accent)] hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              AWUSB Xtra
            </a>
            . An Xtra for Macromedia Director (yea, it&apos;s <em>that</em>{" "}
            old), which provided a Lingo interface to the ActiveWire, Inc&apos;s
            16 pin USB card.
          </li>
        </ul>
      </ProjectSection>
    </section>
  );
}

function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2.5">
        <span className="w-2 h-2 border-[1.5px] border-[var(--accent)] rounded-full shrink-0" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function Project({
  name,
  href,
  children,
}: {
  name: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
      <a
        href={href}
        className="text-[var(--accent)] font-medium hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
      . {children}
    </p>
  );
}
