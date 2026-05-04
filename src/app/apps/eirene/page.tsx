import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eirene — Breathwork, safety-first",
  description:
    "A breathwork practice tool built safety-first. No ads. No tracking. Coming to the App Store and Google Play.",
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
    title: "Guided full-screen practice.",
    description:
      "An on-screen animation and optional haptic cues guide each breath, so you can practice with your eyes open or closed. The app won't fall asleep mid-session.",
  },
  {
    title: "Pre-session safety guide.",
    description:
      "A safety guide precedes each session. Not skippable — this practice deserves intention.",
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
                No ads, no tracking. Just you and your breath.
              </p>
              <p className="text-[11px] text-white/30">
                Coming to the App Store and Google Play
              </p>
              <div>
                <span className="inline-block bg-[#C23B22] text-white text-[13px] font-medium px-[22px] py-[10px] rounded-[3px]">
                  Coming soon
                </span>
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
                  className="relative z-10 object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot section */}
      <section className="py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col items-center gap-10">
          <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">
            The practice
          </p>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 w-full justify-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-[32px] overflow-hidden border-2 border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/user-attachments/assets/ef14e5a6-20b9-444a-a800-0369f1f9c712"
                  alt="Eirene breathwork session screen"
                  className="w-full block"
                />
              </div>
              <p className="text-[12px] font-light text-zinc-400 text-center">
                In session
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-[32px] overflow-hidden border-2 border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/user-attachments/assets/2d9e282f-531c-4a28-be3a-c8f5591113bc"
                  alt="Eirene session controls"
                  className="w-full block"
                />
              </div>
              <p className="text-[12px] font-light text-zinc-400 text-center">
                Session controls
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-[32px] overflow-hidden border-2 border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/user-attachments/assets/dd8ca4d9-c068-45a9-81ee-9aefdbda14f7"
                  alt="Eirene pre-session safety guide"
                  className="w-full block"
                />
              </div>
              <p className="text-[12px] font-light text-zinc-400 text-center">
                Safety guide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-200 py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-10">
          <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">
            Features
          </p>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-10 gap-y-8">
            {features.map((f) => (
              <div key={f.title}>
                <p className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                  {f.title}
                </p>
                <p className="text-[13px] font-light text-zinc-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-8">
          <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">
            Safety
          </p>
          <p className="text-[14px] font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Cyclic breathing is a real physiological practice. Lightheadedness,
            tingling, dizziness — these effects are part of how it works.
            That&apos;s exactly why it deserves care.
          </p>
          <ul className="flex flex-col gap-4">
            {safetyBullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-[13px] font-light text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-zinc-400" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-zinc-400 leading-relaxed">
            Eirene is not a medical device. It does not diagnose, treat,
            prevent, or cure any condition.
          </p>
        </div>
      </section>

      {/* Privacy at a glance */}
      <section className="py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-8">
          <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">
            Privacy at a glance
          </p>
          <p className="text-[14px] font-light text-zinc-500 leading-relaxed">
            The app works offline. No account required. Privacy isn&apos;t a
            setting buried in a menu — it&apos;s just how it works.
          </p>
          <ul className="flex flex-col gap-4">
            {privacyBullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-[13px] font-light text-zinc-500 leading-relaxed"
              >
                <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-zinc-300" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-zinc-400">
            For the binding text, see the{" "}
            <Link
              href="/apps/eirene/privacy"
              className="underline underline-offset-2 hover:text-zinc-700 transition-colors"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Get the app */}
      <section className="border-t border-zinc-200 py-20 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-[4.5rem] max-md:px-6 flex flex-col gap-8">
          <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">
            Get the app
          </p>
          <div className="flex gap-3 flex-wrap">
            <span
              aria-disabled="true"
              className="inline-flex items-center border border-zinc-200 text-zinc-400 text-[13px] px-5 py-[10px] rounded-[3px] cursor-not-allowed select-none"
            >
              App Store — coming soon
            </span>
            <span
              aria-disabled="true"
              className="inline-flex items-center border border-zinc-200 text-zinc-400 text-[13px] px-5 py-[10px] rounded-[3px] cursor-not-allowed select-none"
            >
              Google Play — coming soon
            </span>
          </div>
          <p className="text-[12px] text-zinc-400">
            Haptic feedback depends on a device with a haptic motor.
          </p>
        </div>
      </section>

      {/* Footer links */}
      <nav className="flex justify-center gap-6 pb-16 max-md:pb-10">
        <Link
          href="/apps/eirene/privacy"
          className="text-[12px] text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/apps/eirene/support"
          className="text-[12px] text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          Support
        </Link>
      </nav>
    </>
  );
}
