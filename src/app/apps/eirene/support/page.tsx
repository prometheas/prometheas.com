import type { Metadata } from "next";
import Link from "next/link";
import SupportForm from "./support-form";

export const metadata: Metadata = {
  title: "Eirene · Support",
  description:
    "Get help with Eirene. Contact the developer or browse common questions.",
};

const accentLinkClass =
  "text-[var(--accent)] no-underline transition-opacity hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)]";

export default function EireneSupportPage() {
  return (
    <article className="max-w-[720px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <Link
        href="/apps/eirene"
        className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
      >
        ← Eirene
      </Link>

      <h1 className="text-4xl max-md:text-3xl font-light text-[var(--text-primary)] mt-6 mb-6">
        Support
      </h1>

      <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light mb-12">
        Eirene is a small, deliberately-scoped app. Support is handled directly
        by the developer&mdash;there is no ticketing system, no support hours,
        and no chatbot. If something is wrong or unclear, send a message using
        the form below and you&apos;ll hear back.
      </p>

      <section id="contact">
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mb-6">
          Contact
        </h2>
        <SupportForm />
        <p className="text-[0.8rem] text-[var(--text-muted)] font-light mt-4">
          <em>Submissions are processed by Formspree.</em>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mb-6">
          FAQ
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-[0.95rem] font-medium text-[var(--text-primary)] mb-2">
              How do I get started?
            </h3>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
              Install the app, read through the safety interstitial on first
              launch, and run a session at the default settings before
              customizing. See the{" "}
              <Link href="/apps/eirene" className={accentLinkClass}>
                Eirene overview
              </Link>{" "}
              for more.
            </p>
          </div>

          <div>
            <h3 className="text-[0.95rem] font-medium text-[var(--text-primary)] mb-2">
              How is my practice data handled?
            </h3>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
              Practice data stays on your device&mdash;it is stored locally and
              never transmitted. See the{" "}
              <Link href="/apps/eirene/privacy" className={accentLinkClass}>
                privacy policy
              </Link>{" "}
              for the full picture.
            </p>
          </div>

          <div>
            <h3 className="text-[0.95rem] font-medium text-[var(--text-primary)] mb-2">
              How do I delete my data?
            </h3>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
              From Settings inside the app, or by uninstalling. No account
              exists, so there is nothing to clean up server-side. See the{" "}
              <Link
                href="/apps/eirene/privacy#your-data-your-control"
                className={accentLinkClass}
              >
                data section of the privacy policy
              </Link>
              .
            </p>
          </div>
        </div>

        <p className="text-[0.875rem] text-[var(--text-muted)] font-light leading-[1.75] mt-10 italic">
          For questions about whether this practice is safe for you
          specifically, consult a qualified medical professional. We can&apos;t
          and won&apos;t offer medical guidance.
        </p>
      </section>
    </article>
  );
}
