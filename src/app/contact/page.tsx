import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="max-w-[600px] mx-auto px-[4.5rem] max-md:px-6 py-20 max-md:py-12">
      <h1 className="text-4xl max-md:text-3xl font-light text-[var(--text-primary)] mb-2">
        Contact
      </h1>
      <p className="text-[var(--text-muted)] font-light mb-10">
        Reach out and touch someone. (Where that <em>someone</em> is me.)
      </p>

      <h2 className="text-xl font-medium text-[var(--text-primary)] mb-6">
        Send Me a Note
      </h2>

      {/* Replace YOUR_FORM_ID with your Formspree form ID */}
      <form
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-[var(--border)] rounded text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] font-light focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-[var(--border)] rounded text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] font-light focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 border border-[var(--border)] rounded text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] font-light focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-y"
          />
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-red text-white text-sm font-medium tracking-wide uppercase rounded hover:bg-red-hover transition-colors cursor-pointer"
        >
          Send
        </button>
      </form>
    </section>
  );
}
