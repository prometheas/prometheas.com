import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { EireneScreenshotCarousel } from "./eirene-screenshot-carousel";

const DOWNLOAD_SECTION_ID = "get-the-app";
const APP_STORE_URL = "https://apps.apple.com/us/app/eirene/id6762246199";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.prometheaslabs.eirene.mobile";
const accentLinkClass =
  "text-[var(--accent)] underline underline-offset-2 decoration-[color:var(--accent)] transition-colors hover:text-[var(--accent-hover)] hover:decoration-[color:var(--accent-hover)]";

export const metadata: Metadata = {
  title: "Eirene — Breathwork, safety-first",
  description:
    "A breathwork practice tool built safety-first. No ads. No sign-ups. Now available on the App Store and Google Play.",
  openGraph: {
    images: [{ url: "/apps/eirene/icon.png", width: 1024, height: 1024 }],
  },
};

const features = [
  {
    title: "Built-in breathing sessions.",
    description:
      "A handful of patterns worth practicing: beginner, intermediate, & advanced. Open the app, pick one, go.",
  },
  {
    title: "Guided practice.",
    description:
      "An on-screen animation and optional haptic cues guide each breath, so you can practice with your eyes open or closed. Place your phone on the pillow, next to your ear to hear guiding humming sounds, or just hold it in your hand to feel the vibrations.",
  },
  {
    title: "Pre-session safety guide.",
    description:
      "A safety guide precedes each session to remind you of best practices and potential risks.",
  },
];

const safetyBullets = [
  "Practice seated or lying down on a soft surface. Never practice in or near water, while driving, while operating machinery, or while standing.",
  "Talk to a physician before starting if you have a cardiovascular or respiratory condition, a history of seizures or fainting, are pregnant, or have recently had surgery. This list is not exhaustive — when in doubt, ask a professional who knows your history.",
];

const privacyBullets = [
  "No account is required to use the app.",
  "No advertising trackers, no third-party data sharing for marketing.",
  "Any optional analytics are opt-in and explained at the moment of consent.",
  "Your session history and preferences live on your device.",
];

const screenshots = [
  {
    alt: "Eirene breathwork session screen",
    label: "In session",
    src: "https://github.com/user-attachments/assets/ef14e5a6-20b9-444a-a800-0369f1f9c712",
  },
  {
    alt: "Eirene session controls",
    label: "Session controls",
    src: "https://github.com/user-attachments/assets/2d9e282f-531c-4a28-be3a-c8f5591113bc",
  },
  {
    alt: "Eirene pre-session safety guide",
    label: "Safety guide",
    src: "https://github.com/user-attachments/assets/dd8ca4d9-c068-45a9-81ee-9aefdbda14f7",
  },
];

export default function EirenePage() {
  return (
    <>
      {/* Hero band */}
      <section className="bg-[#10284A] border-y border-zinc-200">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-14">
          <div className="grid grid-cols-[1.618fr_1fr] gap-[44px] items-center max-md:grid-cols-1 max-md:gap-10">
            {/* Left: copy */}
            <div className="flex flex-col gap-5 max-md:order-2">
              <p className="text-[13px] tracking-[0.2em] uppercase text-white/45">
                Eirene
              </p>
              <h1 className="text-[22px] font-light text-[#f5fbff] leading-snug">
                Breathwork for people who take it seriously.
              </h1>
              <p className="text-[13px] text-white/50">
                No ads. No sign-ups. Works perfectly offline. Just you and your
                breath.
              </p>
              <div>
                <Link
                  href={`#${DOWNLOAD_SECTION_ID}`}
                  className="inline-flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10284A]"
                >
                  See download options
                  <span aria-hidden="true">↓</span>
                </Link>
              </div>
            </div>
            {/* Right: icon with radial glow */}
            <div className="flex items-center justify-center max-md:order-1">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(98,244,255,0.12)_0%,transparent_65%)]" />
                <Image
                  src="/apps/eirene/splash-icon.png"
                  alt="Eirene"
                  width={160}
                  height={160}
                  className="relative z-10 h-auto w-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EireneScreenshotCarousel screenshots={screenshots} />

      {/* Features */}
      <section className="border-t border-[var(--border)] py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-10">
          <h2 className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--text-muted)]">
            Features
          </h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-10 gap-y-8">
            {features.map((f) => (
              <div key={f.title}>
                <p className="mb-1 text-[14px] font-medium text-[var(--text-primary)]">
                  {f.title}
                </p>
                <p className="text-[13px] font-light leading-relaxed text-[var(--text-secondary)]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-muted)] py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-8">
          <h2 className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--text-muted)]">
            Safety
          </h2>
          <p className="text-[14px] font-light leading-relaxed text-[var(--text-secondary)]">
            Cyclic breathing is a real physiological practice. Lightheadedness,
            tingling, dizziness — these effects are part of how it works.
            That&apos;s exactly why it deserves care.
          </p>
          <ul className="flex flex-col gap-4">
            {safetyBullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-[13px] font-light leading-relaxed text-[var(--text-secondary)]"
              >
                <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--text-muted)]" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-[12px] leading-relaxed text-[var(--text-muted)]">
            Eirene is not a medical device. It does not diagnose, treat,
            prevent, or cure any condition.
          </p>
        </div>
      </section>

      {/* Privacy at a glance */}
      <section className="py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-8">
          <h2 className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--text-muted)]">
            Privacy at a glance
          </h2>
          <p className="text-[14px] font-light leading-relaxed text-[var(--text-secondary)]">
            The app works offline. No account required. Privacy isn&apos;t a
            setting buried in a menu — it&apos;s just how it works.
          </p>
          <ul className="flex flex-col gap-4">
            {privacyBullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-[13px] font-light leading-relaxed text-[var(--text-secondary)]"
              >
                <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--border)]" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-[var(--text-muted)]">
            For the binding text, see the{" "}
            <Link href="/apps/eirene/privacy" className={accentLinkClass}>
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Get the app */}
      <section
        id={DOWNLOAD_SECTION_ID}
        className="border-t border-[var(--border)] py-20 max-md:py-12"
      >
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-8">
          <h2 className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--text-muted)]">
            Get the app
          </h2>
          <p className="text-[14px] font-light leading-relaxed text-[var(--text-secondary)]">
            Available now on both marketplaces.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href={APP_STORE_URL}
              className="inline-flex rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C23B22] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Image
                src="/apps/eirene/app-store-badge.svg"
                alt="Download on the App Store"
                width={168}
                height={56}
                className="block"
              />
            </Link>
            <Link
              href={GOOGLE_PLAY_URL}
              className="inline-flex rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C23B22] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Image
                src="/apps/eirene/google-play-badge.png"
                alt="Get it on Google Play"
                width={188}
                height={56}
                className="block"
              />
            </Link>
          </div>
          <p className="text-[12px] text-[var(--text-muted)]">
            Haptic feedback depends on a device with a haptic motor.
          </p>
        </div>
      </section>

      {/* Footer links */}
      <nav className="flex justify-center gap-6 pb-16 max-md:pb-10">
        <Link href="/apps/eirene/privacy" className={accentLinkClass}>
          Privacy Policy
        </Link>
        <Link href="/apps/eirene/support" className={accentLinkClass}>
          Support
        </Link>
      </nav>
    </>
  );
}
