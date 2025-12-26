"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Github, Linkedin, Mail, MessageSquare, Phone } from "lucide-react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  company: string; // honeypot
};

function encodeMailto(value: string) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "sending" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const mailtoHref = useMemo(() => {
    const name = `${form.firstName} ${form.lastName}`.trim();
    const subject = `Portfolio contact${name ? ` from ${name}` : ""}`;
    const body = [
      `Name: ${name || "-"}`,
      `Email: ${form.email || "-"}`,
      "",
      "Message:",
      form.message || "-",
    ].join("\n");

    return `mailto:sannidhishetty9@gmail.com?subject=${encodeMailto(subject)}&body=${encodeMailto(body)}`;
  }, [form.email, form.firstName, form.lastName, form.message]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // If email sending isn't configured, fall back to mailto (so the form still "works").
      if (res.status === 202) {
        setStatus({ kind: "idle" });
        window.location.href = mailtoHref;
        return;
      }

      const data = (await res.json().catch(() => null)) as
        | { ok: true; sent: true }
        | { ok: false; error?: string };

      if (!res.ok || !data || ("ok" in data && data.ok === false)) {
        setStatus({ kind: "error", message: "Failed to send. Please try again." });
        return;
      }

      setStatus({ kind: "success" });
      setForm({ firstName: "", lastName: "", email: "", message: "", company: "" });
    } catch {
      setStatus({ kind: "error", message: "Failed to send. Please try again." });
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 pt-14 md:pt-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Contact
          </h2>
          <p className="mt-3 text-sm md:text-base text-zinc-400">
            Send me a message — I’ll get back to you soon.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/20 p-6 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          {/* subtle glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/12 via-indigo-500/10 to-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-emerald-500/8 via-cyan-500/8 to-indigo-500/8 blur-3xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-center">
            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, firstName: e.target.value }))
                  }
                  placeholder="First Name"
                  className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, lastName: e.target.value }))
                  }
                  placeholder="Last Name"
                  className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              {/* Honeypot: hidden field bots fill, humans won't. */}
              <input
                value={form.company}
                onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <input
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />

              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((s) => ({ ...s, message: e.target.value }))
                }
                required
                placeholder="Your message"
                rows={4}
                className="w-full resize-none rounded-2xl border border-zinc-800/80 bg-zinc-950/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />

              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-10 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition"
              >
                {status.kind === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status.kind === "success" ? (
                <div className="text-sm text-emerald-300">Message sent — thank you!</div>
              ) : null}
              {status.kind === "error" ? (
                <div className="text-sm text-red-300">{status.message}</div>
              ) : null}
            </form>

            {/* Icon */}
            <div className="hidden md:flex items-center justify-center">
              <div className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <MessageSquare className="h-44 w-44 text-indigo-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Social icons row */}
        <div className="mt-10 flex items-center justify-center gap-8 md:gap-10">
          <Link
            href="https://linkedin.com/in/sannidhishetty9"
            target="_blank"
            aria-label="LinkedIn"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/20 text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
          >
            <Linkedin className="h-7 w-7" />
          </Link>
          <Link
            href="https://github.com/sannidhi470"
            target="_blank"
            aria-label="GitHub"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/20 text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
          >
            <Github className="h-7 w-7" />
          </Link>
          <Link
            href="mailto:sannidhishetty9@gmail.com"
            aria-label="Email"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/20 text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
          >
            <Mail className="h-7 w-7" />
          </Link>
          <Link
            href="tel:+14388550734"
            aria-label="Phone"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-950/20 text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
          >
            <Phone className="h-7 w-7" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-14 text-center">
          <div className="text-xl md:text-2xl font-semibold text-zinc-200/90">
            Thanks for visiting!
          </div>
          <div className="mt-2 text-sm text-zinc-500">
            © 2025 Sannidhi. All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}


