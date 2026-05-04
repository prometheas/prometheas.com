"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const labelClass =
  "block text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--text-muted)] mb-1.5";

const fieldClass =
  "w-full px-4 py-3 border border-[var(--border)] rounded text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] font-light focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors";

const ChevronIcon = () => (
  <svg
    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit() {
    if (!email.trim() || !platform || !message.trim()) return;
    setState("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xwvylooz", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          _replyto: email,
          platform,
          app_version: appVersion,
          topic,
          message,
        }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="py-6">
        <p className="text-[var(--text-primary)] font-light text-lg mb-1">
          Message sent.
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          You&apos;ll hear back at {email}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-5"
      noValidate
    >
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <div>
          <label htmlFor="sf-name" className={labelClass}>
            Name (optional)
          </label>
          <input
            id="sf-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="sf-email" className={labelClass}>
            Email
          </label>
          <input
            id="sf-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={fieldClass}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="sf-platform" className={labelClass}>
            Platform
          </label>
          <div className="relative">
            <select
              id="sf-platform"
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
              className={`${fieldClass} appearance-none pr-8`}
            >
              <option value="" disabled>
                Select…
              </option>
              <option value="iOS">iOS</option>
              <option value="Android">Android</option>
            </select>
            <ChevronIcon />
          </div>
        </div>

        <div>
          <label htmlFor="sf-version" className={labelClass}>
            App version (optional)
          </label>
          <input
            id="sf-version"
            type="text"
            name="app_version"
            value={appVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            placeholder="e.g. 1.2.0 — find in Settings → About"
            className={`${fieldClass} placeholder:text-[var(--text-muted)]`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sf-topic" className={labelClass}>
          Topic (optional)
        </label>
        <div className="relative">
          <select
            id="sf-topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`${fieldClass} appearance-none pr-8`}
          >
            <option value="">General</option>
            <option value="Bug">Bug</option>
            <option value="Feature request">Feature request</option>
            <option value="Privacy">Privacy</option>
          </select>
          <ChevronIcon />
        </div>
      </div>

      <div>
        <label htmlFor="sf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="sf-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-[var(--text-secondary)] border-l-2 border-red pl-3">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="px-8 py-3 bg-red text-white text-sm font-medium tracking-wide uppercase rounded hover:bg-red-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
