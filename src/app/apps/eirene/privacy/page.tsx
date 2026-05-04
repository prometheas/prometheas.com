import type { Metadata } from "next";
import Link from "next/link";

const EFFECTIVE_DATE = "May 5, 2026";

export const metadata: Metadata = {
  title: "Eirene · Privacy Policy",
  description:
    "Privacy policy for Eirene, a breathwork practice app by Prometheas Labs LLC.",
};

export default function EirenePrivacyPage() {
  return (
    <article className="max-w-[720px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <Link
        href="/apps/eirene"
        className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
      >
        ← Eirene
      </Link>

      <h1 className="text-4xl max-md:text-3xl font-light text-[var(--text-primary)] mt-6 mb-3">
        Privacy Policy
      </h1>
      <p className="text-[13px] text-[var(--text-muted)] mb-12">
        Effective: {EFFECTIVE_DATE}
      </p>

      <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light space-y-5 mb-10">
        <p>
          Eirene is a breathwork practice app published by Prometheas Labs LLC.
          This policy is short because there is genuinely very little to
          disclose&mdash;that is intentional, not an oversight.
        </p>
      </div>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          What this app collects
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light space-y-4">
          <p>
            <strong className="font-medium text-[var(--text-primary)]">
              Practice data
            </strong>{" "}
            (sessions, breath patterns, timing) is stored exclusively on-device
            in a local database and is never transmitted off-device. No account,
            no cloud sync, no server-side copy.
          </p>
          <p>
            <strong className="font-medium text-[var(--text-primary)]">
              Analytics
            </strong>{" "}
            are opt-in only. With your consent, the app sends product-usage
            events&mdash;which screens were viewed, which features were used,
            with no practice content&mdash;to PostHog, tagged with a random
            per-installation identifier. Without consent, no analytics events
            are sent and the app behaves identically.
          </p>
          <p>
            <strong className="font-medium text-[var(--text-primary)]">
              Error reports
            </strong>{" "}
            are sent to Sentry to keep the app reliable. Reports from users who
            have not given analytics consent contain only the error and generic
            environment metadata (app version, OS version) with no persistent
            identifier&mdash;they cannot be linked to an individual or
            correlated across sessions. Users who have given analytics consent
            have the same random identifier attached to their reports.
          </p>
          <p>
            <strong className="font-medium text-[var(--text-primary)]">
              No advertising identifiers
            </strong>{" "}
            (IDFA, IDFV, Android Advertising ID) are collected, ever.
          </p>
          <p>
            <strong className="font-medium text-[var(--text-primary)]">
              No location data
            </strong>{" "}
            is collected.
          </p>
          <p>
            The optional{" "}
            <strong className="font-medium text-[var(--text-primary)]">
              biometric lock
            </strong>{" "}
            feature uses your device&apos;s OS-level biometric prompt. The app
            receives only a success or failure signal&mdash;no biometric data
            leaves your device.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          How we use it
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <p>
            Analytics data (with your consent) is used to understand which
            features are used, to inform product decisions. Error reports are
            used to diagnose crashes and bugs. Nothing else&mdash;no marketing,
            advertising, or profile-building.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Third-party services
        </h2>
        <ul className="list-disc pl-5 space-y-3 text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <li>
            <strong className="font-medium text-[var(--text-primary)]">
              PostHog
            </strong>{" "}
            (analytics) &mdash; receives events only with your consent; events
            contain no practice content.{" "}
            <a
              href="https://posthog.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
            >
              Privacy policy
            </a>
            .
          </li>
          <li>
            <strong className="font-medium text-[var(--text-primary)]">
              Sentry
            </strong>{" "}
            (error tracking) &mdash; receives error and stack-trace data only.{" "}
            <a
              href="https://sentry.io/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
            >
              Privacy policy
            </a>
            .
          </li>
          <li>
            <strong className="font-medium text-[var(--text-primary)]">
              Apple App Store / Google Play
            </strong>{" "}
            (distribution) &mdash; app updates and store-level metrics; governed
            by each platform&apos;s own privacy policy.
          </li>
          <li>
            <strong className="font-medium text-[var(--text-primary)]">
              Expo / EAS
            </strong>{" "}
            (over-the-air updates) &mdash; used to deliver app updates; no
            practice data is transmitted through this channel.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Data sharing
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <p>
            No personal data is sold, shared, or transferred to third parties
            for advertising, marketing, or profiling. The only third parties
            that receive data are the operational services listed above, which
            receive only the data described in their respective entries.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Data retention
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <p>
            Practice data lives on your device until you delete it or uninstall
            the app. Reinstalling the app starts fresh. Analytics data (PostHog)
            and error reports (Sentry) are retained per each vendor&apos;s
            default retention policy.
          </p>
        </div>
      </section>

      <section id="your-data-your-control">
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Your data, your control
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light space-y-4">
          <p>
            Practice data can be deleted via Settings &rarr; data management, or
            by uninstalling the app.
          </p>
          <p>
            Your analytics identifier is resettable from Settings, which severs
            all future events from prior history. Reinstalling the app also
            regenerates the identifier.
          </p>
          <p>
            No account exists in this app, so there is no account-deletion
            process.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Children&apos;s privacy
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <p>
            Eirene is not directed at children under 13 and does not knowingly
            collect data from children under 13. Cyclic breathwork is an adult
            practice with documented physiological effects and
            contraindications; it is not appropriate for children. If you
            believe a child has provided information through the app, please
            contact us via the{" "}
            <Link
              href="/apps/eirene/support"
              className="underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
            >
              support page
            </Link>
            .
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Contact
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <p>
            For privacy questions, use the contact form on our{" "}
            <Link
              href="/apps/eirene/support"
              className="underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
            >
              support page
            </Link>
            .
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-[1rem] font-medium text-[var(--text-primary)] mt-10 mb-3">
          Changes to this policy
        </h2>
        <div className="text-[0.95rem] text-[var(--text-secondary)] leading-[1.85] font-light">
          <p>
            Material changes to this policy will be reflected by updating the
            effective date at the top of this page. Where a change affects
            in-app data handling, a notice will appear in the app on next
            launch.
          </p>
        </div>
      </section>
    </article>
  );
}
